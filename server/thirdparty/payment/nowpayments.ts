import { createHmac, timingSafeEqual } from 'crypto';

import * as common from '../common';
import { BACKEND_URL, FRONTEND_URL, PROJECT_ID } from '../common';
import { CreatePaymentParams, PaymentResult, PaymentSessionInfo, ThirdPartyPaymentProvider } from '../payment-definitions';
import { isDeployedRequest } from '../secret-resolver';
import { resolveNowPaymentsPricePair } from './amount';

export {
    DEFAULT_NOWPAYMENTS_CNY_PER_USD,
    resolveNowPaymentsPricePair,
} from './amount';
export type { NowPaymentsPricePair } from './amount';

const DEFAULT_NOWPAYMENTS_API_BASE_URL = 'https://api.nowpayments.io';
export type NowPaymentsCredentialMode = 'preview' | 'deploy';

export interface NowPaymentsIpnEvent {
    invoiceId: string | null;
    paymentId: string | null;
    orderId: string | null;
    rawStatus: string;
    status: PaymentSessionInfo['status'];
}

function currentCredentialMode(): NowPaymentsCredentialMode {
    return isDeployedRequest() ? 'deploy' : 'preview';
}

function secret(name: string, required: boolean, mode: NowPaymentsCredentialMode = currentCredentialMode()): string {
    const values = common as unknown as Record<string, string>;
    const preview = String(values[name] || '').trim();
    const deploy = String(values[`${name}_DEPLOY`] || '').trim();
    const value = mode === 'deploy' ? deploy : preview;
    const normalized = /^\{\{[A-Z0-9_]+\}\}$/.test(value) ? '' : value;
    if (required && !normalized) throw new Error(`${name} is not configured.`);
    return normalized;
}

function apiBaseUrl(mode: NowPaymentsCredentialMode = currentCredentialMode()): string {
    const configured = secret('THIRD_PARTY_NOWPAYMENTS_API_BASE_URL', false, mode);
    return (configured || DEFAULT_NOWPAYMENTS_API_BASE_URL)
        .replace(/\/+$/, '');
}

function statsProjectId(): string {
    const match = PROJECT_ID.match(/^(PROJ_[a-f0-9]+)_snap_\d{8}_\d{6}_\d+$/i);
    return match ? match[1] : PROJECT_ID;
}

function projectUrl(baseUrl: string, path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}/${PROJECT_ID}${normalized}`;
}

function withCredentialMode(url: string, mode: NowPaymentsCredentialMode): string {
    const parsed = new URL(url);
    parsed.searchParams.set('credential_mode', mode);
    return parsed.toString();
}

async function nowPaymentsRequest<T>(path: string, init: RequestInit = {}, mode: NowPaymentsCredentialMode = currentCredentialMode()): Promise<T> {
    const response = await fetch(`${apiBaseUrl(mode)}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': secret('THIRD_PARTY_NOWPAYMENTS_API_KEY', true, mode),
            ...(init.headers || {}),
        },
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
        const message = data?.message || data?.error || response.statusText;
        throw new Error(`NOWPayments API request failed: ${message}`);
    }
    return data as T;
}

function sortObject(value: any): any {
    if (Array.isArray(value)) return value.map(sortObject);
    if (!value || typeof value !== 'object') return value;
    return Object.keys(value).sort().reduce((result: Record<string, any>, key) => {
        result[key] = sortObject(value[key]);
        return result;
    }, {});
}

export function verifyNowPaymentsIpn(rawBody: string, signature: string, mode: NowPaymentsCredentialMode = currentCredentialMode()): boolean {
    if (!rawBody || !signature) return false;
    try {
        const parsed = JSON.parse(rawBody);
        const canonical = JSON.stringify(sortObject(parsed));
        const expected = createHmac('sha512', secret('THIRD_PARTY_NOWPAYMENTS_IPN_SECRET', true, mode))
            .update(canonical)
            .digest('hex');
        const expectedBuffer = Buffer.from(expected, 'hex');
        const actualBuffer = Buffer.from(signature.trim().toLowerCase(), 'hex');
        return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
    } catch {
        return false;
    }
}

function normalizeProviderIdentifier(value: unknown): string {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'bigint') return '';
    return String(value).trim();
}

/**
 * Converts an untrusted provider payload into a verified, stable business event.
 * Callers must not read identifiers or status directly from the raw request body.
 */
export function parseVerifiedNowPaymentsIpn(
    rawBody: string,
    signature: string,
    mode: NowPaymentsCredentialMode = currentCredentialMode(),
): NowPaymentsIpnEvent {
    if (!verifyNowPaymentsIpn(rawBody, signature, mode)) {
        throw new Error('Invalid NOWPayments IPN signature.');
    }

    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Invalid NOWPayments IPN payload.');
    }

    const payload = parsed as Record<string, unknown>;
    const invoiceId = normalizeProviderIdentifier(payload.invoice_id);
    const paymentId = normalizeProviderIdentifier(payload.payment_id);
    const orderId = normalizeProviderIdentifier(payload.order_id);
    const rawStatus = String(payload.payment_status ?? '').trim().toLowerCase();
    if ((!invoiceId && !paymentId && !orderId) || !rawStatus) {
        throw new Error('NOWPayments IPN is missing required payment identity or status.');
    }

    return {
        invoiceId: invoiceId || null,
        paymentId: paymentId || null,
        orderId: orderId || null,
        rawStatus,
        status: normalizeNowPaymentsStatus(rawStatus),
    };
}

export function normalizeNowPaymentsStatus(rawStatus: unknown): PaymentSessionInfo['status'] {
    const status = String(rawStatus || '').trim().toLowerCase();
    if (status === 'finished') return 'paid';
    if (['failed', 'refunded'].includes(status)) return 'failed';
    if (status === 'expired') return 'canceled';
    return 'unpaid';
}

export async function createNowPaymentsInvoice(params: CreatePaymentParams): Promise<PaymentResult> {
    const pricing = resolveNowPaymentsPricePair(
        params.amount,
        params.currency,
        params.nowPaymentsCnyPerUsd,
    );
    const orderId = String(params.orderId || '').trim();
    if (!orderId) throw new Error('NOWPayments orderId is required. Create the local pending order first.');
    const ipnCallbackUrl = String(params.ipnCallbackUrl || '').trim();
    if (!ipnCallbackUrl) throw new Error('NOWPayments ipnCallbackUrl is required.');

    const canonicalProjectId = statsProjectId();
    const providerOrderId = `${canonicalProjectId}:${orderId}`;
    const credentialMode = currentCredentialMode();
    const body: Record<string, unknown> = {
        price_amount: pricing.providerPriceAmount,
        price_currency: pricing.providerPriceCurrency,
        // Platform analytics is read-only, so project ownership must travel with the provider order.
        order_id: providerOrderId,
        order_description: params.productName || `Order ${orderId}`,
        ipn_callback_url: withCredentialMode(projectUrl(BACKEND_URL, ipnCallbackUrl), credentialMode),
        success_url: projectUrl(FRONTEND_URL, params.successUrl),
        cancel_url: projectUrl(FRONTEND_URL, params.cancelUrl),
    };
    if (params.payCurrency) body.pay_currency = params.payCurrency.toLowerCase();

    const invoice = await nowPaymentsRequest<any>('/v1/invoice', {
        method: 'POST',
        body: JSON.stringify(body),
    }, credentialMode);
    const invoiceId = String(invoice.id || invoice.invoice_id || '');
    if (!invoiceId || !invoice.invoice_url) throw new Error('NOWPayments invoice response is incomplete.');
    return {
        url: String(invoice.invoice_url),
        invoiceId,
        outTradeNo: providerOrderId,
        provider: 'nowpayments',
        statsProjectId: canonicalProjectId,
        pricing,
        raw: invoice,
    };
}

export async function getNowPaymentsSession(
    paymentId: string,
    mode: NowPaymentsCredentialMode = currentCredentialMode(),
): Promise<PaymentSessionInfo | null> {
    try {
        // paymentId may come from a verified IPN or the hosted return URL's NP_id.
        // Business code must still match invoiceId and orderId to its local payment record.
        const payment = await nowPaymentsRequest<any>(`/v1/payment/${encodeURIComponent(paymentId)}`, {}, mode);
        return {
            sessionId: normalizeProviderIdentifier(payment.payment_id) || paymentId,
            status: normalizeNowPaymentsStatus(payment.payment_status || payment.status),
            amountTotal: payment.price_amount == null ? undefined : Number(payment.price_amount),
            currency: String(payment.price_currency || '').toLowerCase(),
            metadata: {
                orderId: normalizeProviderIdentifier(payment.order_id) || null,
                invoiceId: normalizeProviderIdentifier(payment.invoice_id) || null,
            },
            raw: payment,
        };
    } catch (error) {
        console.error('NOWPayments query error:', error);
        return null;
    }
}

export const provider: ThirdPartyPaymentProvider = {
    createPaymentSession: createNowPaymentsInvoice,
    getPaymentSession: getNowPaymentsSession,
};

export function getPaymentProvider(_name?: string): ThirdPartyPaymentProvider {
    return provider;
}
