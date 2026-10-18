import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage';
import { getLocalizedService, localizedServiceMetadata } from '@/components/seo/localized-content';
import type { Metadata } from 'next';

const key = 'montageservice-wien' as const;
export const metadata: Metadata = localizedServiceMetadata('en', key);
export default function Page() { return <ServiceLandingPage content={getLocalizedService('en', key)} locale="en" />; }
