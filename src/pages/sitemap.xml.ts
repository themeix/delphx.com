import type { APIRoute } from 'astro';
import teamMembers from '../data/team.json';
import pressReleases from '../data/pressReleases.json';

const staticRoutes = [
  '',
  '/about',
  '/team',
  '/blog',
  '/contact',
  '/press-releases',
  '/terms-and-conditions',
  '/privacy-policy',
  '/investors',
  '/delphx-acronym-and-term-playbook',
  '/company-financials',
  '/resources',
  '/agm',
];

export const GET: APIRoute = () => {
  const base = 'https://www.delphx.com';
  const urls = [
    ...staticRoutes.map((r) => `${base}${r}`),
    ...teamMembers.map((m) => `${base}/team/${m.slug}`),
    ...pressReleases.map((pr) => `${base}/press-releases/${pr.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
