import type { MetadataRoute } from 'next';

const siteUrl = 'https://handwerker-wien.com';
const services = ['moebelmontage-wien', 'montageservice-wien', 'demontage-wien', 'reparaturen-wien', 'bodenverlegung-wien'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/servicescatalog/', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/serviceareas/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pricingscope/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/quoterequestform/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/ru/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/en/', priority: 0.8, changeFrequency: 'monthly' as const },
  ];
  const servicePages = services.flatMap((slug) => [
    { path: `/${slug}/`, priority: 0.9, changeFrequency: 'monthly' as const },
    { path: `/ru/${slug}/`, priority: 0.85, changeFrequency: 'monthly' as const },
    { path: `/en/${slug}/`, priority: 0.85, changeFrequency: 'monthly' as const },
  ]);
  return [...staticPages, ...servicePages].map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
