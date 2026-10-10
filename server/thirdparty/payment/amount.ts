const CRYPTO_PRICE_CURRENCIES = new Set([
    'ada', 'avax', 'bch', 'bnb', 'btc', 'dai', 'doge', 'dot', 'eth', 'link',
    'ltc', 'matic', 'sol', 'trx', 'uni', 'usdc', 'usdt', 'xlm', 'xmr', 'xrp',
]);

export const DEFAULT_NOWPAYMENTS_CNY_PER_USD = 7;

export interface NowPaymentsPricePair {
    sourceAmount: number;
    sourceCurrency: string;
    providerPriceAmount: number;
    providerPriceCurrency: string;
    cnyPerUsd: number | null;
}

function scaledPaymentAmount(
    rawAmount: number | string,
    scale: number,
    providerName: string,
): string {
    let text = String(rawAmount).trim();
    if (text.startsWith('+')) text = text.slice(1);
    if (text.startsWith('.')) text = `0${text}`;
    const match = text.match(/^(\d+)(?:\.(\d*))?(?:e([+-]?\d+))?$/i);
    if (!match || !Number.isInteger(scale) || scale < 0) {
        throw new Error(`${providerName} amount must be a positive decimal number.`);
    }

    const integerPart = match[1];
    const fractionPart = match[2] || '';
    const exponent = Number(match[3] || 0);
    if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > 100) {
        throw new Error(`${providerName} amount exponent is out of range.`);
    }

    const digits = `${integerPart}${fractionPart}`;
    const decimalIndex = integerPart.length + exponent;
    let whole: string;
    let fraction: string;
    if (decimalIndex <= 0) {
        whole = '0';
        fraction = `${'0'.repeat(-decimalIndex)}${digits}`;
    } else if (decimalIndex >= digits.length) {
        whole = `${digits}${'0'.repeat(decimalIndex - digits.length)}`;
        fraction = '';
    } else {
        whole = digits.slice(0, decimalIndex);
        fraction = digits.slice(decimalIndex);
    }

    const paddedFraction = fraction.padEnd(scale + 1, '0');
    const keptFraction = paddedFraction.slice(0, scale);
    let scaled = `${whole}${keptFraction}`.replace(/^0+(?=\d)/, '') || '0';
    if (paddedFraction[scale] >= '5') scaled = incrementDecimalInteger(scaled);
    if (/^0+$/.test(scaled)) {
        throw new Error(`${providerName} amount is below the minimum unit for this currency.`);
    }
    return scaled;
}

function incrementDecimalInteger(value: string): string {
    const digits = value.split('');
    for (let index = digits.length - 1; index >= 0; index -= 1) {
        if (digits[index] !== '9') {
            digits[index] = String(Number(digits[index]) + 1);
            return digits.join('');
        }
        digits[index] = '0';
    }
    return `1${digits.join('')}`;
}

function scaledIntegerToDecimal(scaled: string, scale: number): string {
    if (scale === 0) return scaled;
    const digits = scaled.padStart(scale + 1, '0');
    return `${digits.slice(0, -scale)}.${digits.slice(-scale)}`;
}

export function normalizePaymentAmount(
    rawAmount: number | string,
    scale: number,
    providerName: string,
): number {
    const decimal = scaledIntegerToDecimal(
        scaledPaymentAmount(rawAmount, scale, providerName),
        scale,
    );
    const amount = Number(decimal);
    if (!Number.isFinite(amount)) {
        throw new Error(`${providerName} amount is out of range.`);
    }
    return amount;
}

export function paymentAmountToMinorUnits(
    rawAmount: number | string,
    scale: number,
    providerName: string,
): number {
    const minorUnits = Number(scaledPaymentAmount(rawAmount, scale, providerName));
    if (!Number.isSafeInteger(minorUnits)) {
        throw new Error(`${providerName} amount is out of range.`);
    }
    return minorUnits;
}

export function paymentCurrencyScale(rawCurrency: string): number {
    const currency = String(rawCurrency || '').trim().toLowerCase();
    if (!currency) throw new Error('Payment currency is required.');
    if (CRYPTO_PRICE_CURRENCIES.has(currency) || currency.length !== 3) return 8;
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).resolvedOptions().maximumFractionDigits ?? 2;
    } catch {
        return 8;
    }
}

export function resolveNowPaymentsPricePair(
    rawAmount: number | string,
    rawCurrency: string | undefined,
    rawCnyPerUsd?: number,
): NowPaymentsPricePair {
    const sourceCurrency = String(rawCurrency || '').trim().toLowerCase();
    if (!sourceCurrency) {
        throw new Error('NOWPayments currency is required and must match the amount.');
    }
    const sourceAmount = normalizePaymentAmount(
        rawAmount,
        paymentCurrencyScale(sourceCurrency),
        'NOWPayments',
    );
    if (sourceCurrency !== 'cny') {
        return {
            sourceAmount,
            sourceCurrency,
            providerPriceAmount: sourceAmount,
            providerPriceCurrency: sourceCurrency,
            cnyPerUsd: null,
        };
    }

    const cnyPerUsd = rawCnyPerUsd == null
        ? DEFAULT_NOWPAYMENTS_CNY_PER_USD
        : Number(rawCnyPerUsd);
    if (!Number.isFinite(cnyPerUsd) || cnyPerUsd <= 0) {
        throw new Error('NOWPayments nowPaymentsCnyPerUsd must be a positive number.');
    }
    const providerPriceAmount = normalizePaymentAmount(
        sourceAmount / cnyPerUsd,
        paymentCurrencyScale('usd'),
        'Converted NOWPayments USD',
    );
    return {
        sourceAmount,
        sourceCurrency,
        providerPriceAmount,
        providerPriceCurrency: 'usd',
        cnyPerUsd,
    };
}
