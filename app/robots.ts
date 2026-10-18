import type { MetadataRoute } from 'next';

const siteUrl = 'https://handwerker-wien.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/adminlogin/',
        '/adminregister/',
        '/adminoperationsdashboard/',
        '/adminquotedetail/',
        '/customerlogin/',
        '/customerregister/',
        '/customerinquirytracker/',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
