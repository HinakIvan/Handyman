import type { MetadataRoute } from 'next';

const siteUrl = 'https://handwerker-wien.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/servicescatalog/', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/serviceareas/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pricingscope/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/quoterequestform/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/moebelmontage-wien/', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/montageservice-wien/', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/demontage-wien/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/reparaturen-wien/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/bodenverlegung-wien/', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  return staticPages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
