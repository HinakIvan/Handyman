import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage';
import { getLocalizedService, localizedServiceMetadata } from '@/components/seo/localized-content';
import type { Metadata } from 'next';

const key = 'bodenverlegung-wien' as const;
export const metadata: Metadata = localizedServiceMetadata('de', key);
export default function Page() { return <ServiceLandingPage content={getLocalizedService('de', key)} locale="de" />; }
