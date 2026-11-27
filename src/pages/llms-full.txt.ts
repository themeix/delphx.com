import type { APIRoute } from 'astro';
import teamMembers from '../data/team.json';
import pressReleases from '../data/pressReleases.json';

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const GET: APIRoute = () => {
  const sections: string[] = [
    '# DelphX Capital Markets Inc. — Full Documentation',
    'URL: https://www.delphx.com',
    'Tickers: TSXV: DELX | OTCQB: DPXCF',
    'Contact Email: info@delphx.com',
    'Offices:\n- Head Office – Canada: 15 Prince Arthur Avenue, Toronto, ON M5R 1B2\n- Head Office – USA: 57 West 57th Street, New York, NY 10019\n- Delphx Services Corporation: 265 Davidson Avenue, Suite 210, Somerset, NJ 08873',
    '## Overview\nDelphX Capital Markets Inc. is a publicly traded fintech leader driving innovation in structured credit (Credit Rating Securities - CRS), private placements, and fully collateralized hedged cryptocurrency structured products (QCS).',
    '## Institutional Onboarding & CRS Delivery\n1. Discovery & Structuring: Strategic review of bond portfolio to assess downgrade exposure.\n2. Product Customization: Tailoring Credit Rating Securities to match credit risk profile.\n3. Execution & Custody: Placed through Delphx Services Corp. and administered via US Bank.\n4. Settlement & Reporting: Post-transaction monitoring and visibility through Bloomberg systems.',
    '## Acronym and Term Playbook\n- CPO: Collateralized Put Option — fully-collateralized 144A security providing protection against default of a referenced bond.\n- CRN: Collateralized Reference Note — 144A security providing collateral for CPO in return for a premium.\n- CDS: Credit Default Swap.\n- CUSIP: Committee on Uniform Security Identification Procedures.\n- ISDA: International Swaps and Derivatives Association.\n- 144A: Securities privately placed to qualified institutional investors.\n- SEC: Securities & Exchange Commission.',
    '## Leadership Team\n' +
      teamMembers
        .map(
          (m) =>
            `### ${m.name} — ${m.role}\nURL: https://www.delphx.com/team/${m.slug}\n\n${stripHtml(m.bioHtml)}`
        )
        .join('\n\n'),
    '## Press Releases\n' +
      pressReleases
        .map(
          (pr) =>
            `### ${pr.title}\nDate: ${pr.date}\nURL: https://www.delphx.com/press-releases/${pr.slug}\n\n${stripHtml(pr.bodyHtml)}`
        )
        .join('\n\n---\n\n'),
  ];

  return new Response(sections.join('\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
