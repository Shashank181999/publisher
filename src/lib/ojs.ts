// OJS API Integration
// Fetches content from OJS and displays on YOUR website

const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_URL || 'https://greatbritainjournals.com';

export interface OJSArticle {
  id: number;
  title: string;
  abstract?: string;
  authors: string[];
  pdfUrl?: string;
  keywords?: string[];
  doi?: string;
}

export interface OJSIssue {
  id: number;
  volume: number;
  number: number;
  year: number;
  articles: OJSArticle[];
}

export interface OJSPageContent {
  title: string;
  content: string;
  sections: { heading: string; content: string }[];
}

export interface OJSJournalData {
  name: string;
  shortName: string;
  logoUrl: string;
  homepageImageUrl: string;
  aboutTheJournal: string;
  informationForAuthors: string;
  manuscriptSubmission: string;
  editorEmail: string;
  editorEmail2: string;
  currentIssue: OJSIssue | null;
  recentArticles: OJSArticle[];
  hasPublishedContent: boolean;
}

// Journal mappings
const journalIds: Record<string, number> = {
  'bjahs': 1, 'bjms': 2, 'bjrot': 3, 'bjcstech': 4, 'bjss': 5,
};

const journalShortNames: Record<string, string> = {
  'bjahs': 'BJAHS', 'bjms': 'BJMS', 'bjrot': 'BJROT', 'bjcstech': 'BJCSTECH', 'bjss': 'BJSS',
};

// Fetch page
async function fetchPage(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html' },
    });
    if (!response.ok) return '';
    return await response.text();
  } catch {
    return '';
  }
}

// Clean HTML to text
function cleanHtml(html: string): string {
  if (!html) return '';
  let text = html;
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/\s+/g, ' ');
  return text.trim();
}

// Get main journal data
export async function getOJSJournalData(journalPath: string): Promise<OJSJournalData> {
  const journalId = journalIds[journalPath] || 1;
  const baseUrl = `${OJS_BASE_URL}/index.php/${journalPath}`;
  const shortName = journalShortNames[journalPath] || journalPath.toUpperCase();

  const [mainHtml, issueHtml] = await Promise.all([
    fetchPage(baseUrl),
    fetchPage(`${baseUrl}/issue/current`),
  ]);

  const logoUrl = `${OJS_BASE_URL}/public/journals/${journalId}/pageHeaderLogoImage_en.jpg`;
  const homepageImageUrl = `${OJS_BASE_URL}/public/journals/${journalId}/homepageImage_en.jpg`;

  const titleMatch = mainHtml.match(/<title>([^<]+)<\/title>/i);
  const name = titleMatch ? cleanHtml(titleMatch[1]).replace(/\s*\|.*$/, '') : 'Britain Journal';

  // Extract sections
  const aboutMatch = mainHtml.match(/About the Journal[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  const aboutTheJournal = aboutMatch ? cleanHtml(aboutMatch[1]) :
    `The ${name} is a peer-reviewed academic journal that publishes research and scholarly articles. The journal aims to contribute to the development and advancement of its field, providing a platform for professionals, researchers, and educators to share knowledge, innovations, and evidence-based practices.`;

  const authorMatch = mainHtml.match(/Information for Authors[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  const informationForAuthors = authorMatch ? cleanHtml(authorMatch[1]) :
    `The ${name} invites submissions of any original contribution that advances knowledge in the field. We prioritize publishing research articles, systematic reviews, case reports, and additional perspectives.`;

  const subMatch = mainHtml.match(/Manuscript Submission[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  const manuscriptSubmission = subMatch ? cleanHtml(subMatch[1]) :
    'Manuscripts must be solely the work of the author(s) stated, must not have been previously published elsewhere, and must not be under consideration by another journal.';

  const emailMatches = mainHtml.match(/editor-[^@\s]+@greatbritainjournals\.(com|co\.uk)/gi) || [];
  const editorEmail = emailMatches[0] || `editor-${journalPath}@greatbritainjournals.com`;
  const editorEmail2 = emailMatches[1] || `editor-${journalPath}@greatbritainjournals.co.uk`;

  // Parse current issue articles
  let currentIssue: OJSIssue | null = null;
  const recentArticles: OJSArticle[] = [];
  let hasPublishedContent = false;

  if (issueHtml && !issueHtml.includes('has not published any issues')) {
    const articleBlocks = issueHtml.match(/<div[^>]*class="[^"]*obj_article_summary[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];

    for (const block of articleBlocks) {
      const linkMatch = block.match(/href="[^"]*\/article\/view\/(\d+)"/i);
      const titleMatch = block.match(/<h[34][^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
      const authorsMatch = block.match(/<div[^>]*class="[^"]*authors[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

      if (linkMatch && titleMatch) {
        const title = cleanHtml(titleMatch[1]);
        const authors = authorsMatch ? cleanHtml(authorsMatch[1]).split(/[,;]/).map(a => a.trim()).filter(Boolean) : [];
        if (title) {
          recentArticles.push({ id: parseInt(linkMatch[1]), title, authors });
        }
      }
    }

    hasPublishedContent = recentArticles.length > 0;
    if (hasPublishedContent) {
      const volMatch = issueHtml.match(/Vol(?:ume)?\.?\s*(\d+)/i);
      const numMatch = issueHtml.match(/No\.?\s*(\d+)/i);
      const yearMatch = issueHtml.match(/\((\d{4})\)/);
      currentIssue = {
        id: 1,
        volume: volMatch ? parseInt(volMatch[1]) : 1,
        number: numMatch ? parseInt(numMatch[1]) : 1,
        year: yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear(),
        articles: recentArticles,
      };
    }
  }

  return {
    name, shortName, logoUrl, homepageImageUrl,
    aboutTheJournal, informationForAuthors, manuscriptSubmission,
    editorEmail, editorEmail2,
    currentIssue, recentArticles, hasPublishedContent,
  };
}

// Get specific OJS page content
export async function getOJSPageContent(journalPath: string, pagePath: string): Promise<OJSPageContent> {
  const baseUrl = `${OJS_BASE_URL}/index.php/${journalPath}`;
  const html = await fetchPage(`${baseUrl}/${pagePath}`);

  // Extract title
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                     html.match(/<title>([^<|]+)/i);
  const title = titleMatch ? cleanHtml(titleMatch[1]) : 'Page';

  // Extract main content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                    html.match(/<div[^>]*class="[^"]*page[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

  let content = '';
  const sections: { heading: string; content: string }[] = [];

  if (mainMatch) {
    const mainHtml = mainMatch[1];

    // Extract sections by headings
    const sectionRegex = /<h[23][^>]*>([^<]+)<\/h[23]>([\s\S]*?)(?=<h[23]|$)/gi;
    let match;
    while ((match = sectionRegex.exec(mainHtml)) !== null) {
      const heading = cleanHtml(match[1]);
      const sectionContent = cleanHtml(match[2]);
      if (heading && sectionContent) {
        sections.push({ heading, content: sectionContent });
      }
    }

    // If no sections found, get all content
    if (sections.length === 0) {
      content = cleanHtml(mainHtml);
    }
  }

  return { title, content, sections };
}

// Get article details
export async function getOJSArticle(journalPath: string, articleId: number): Promise<OJSArticle | null> {
  const baseUrl = `${OJS_BASE_URL}/index.php/${journalPath}`;
  const html = await fetchPage(`${baseUrl}/article/view/${articleId}`);

  if (!html) return null;

  const titleMatch = html.match(/<h1[^>]*class="[^"]*page_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
                     html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? cleanHtml(titleMatch[1]) : '';

  const abstractMatch = html.match(/<section[^>]*class="[^"]*abstract[^"]*"[^>]*>([\s\S]*?)<\/section>/i) ||
                        html.match(/<div[^>]*class="[^"]*abstract[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const abstract = abstractMatch ? cleanHtml(abstractMatch[1]) : '';

  const authors: string[] = [];
  const authorSection = html.match(/<ul[^>]*class="[^"]*authors[^"]*"[^>]*>([\s\S]*?)<\/ul>/i);
  if (authorSection) {
    const nameRegex = /<span[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/span>/gi;
    let authorMatch;
    while ((authorMatch = nameRegex.exec(authorSection[1])) !== null) {
      authors.push(cleanHtml(authorMatch[1]));
    }
  }

  const pdfMatch = html.match(/href="([^"]*\/article\/view\/\d+\/\d+)"/i);
  const pdfUrl = pdfMatch ? pdfMatch[1] : undefined;

  const doiMatch = html.match(/doi\.org\/([^\s<"]+)/i);
  const doi = doiMatch ? doiMatch[1] : undefined;

  const keywordsMatch = html.match(/<section[^>]*class="[^"]*keywords[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
  const keywords = keywordsMatch
    ? cleanHtml(keywordsMatch[1]).split(/[,;]/).map(k => k.trim()).filter(Boolean)
    : [];

  return { id: articleId, title, abstract, authors, pdfUrl, doi, keywords };
}

// Get archives
export async function getOJSArchives(journalPath: string): Promise<OJSIssue[]> {
  const baseUrl = `${OJS_BASE_URL}/index.php/${journalPath}`;
  const html = await fetchPage(`${baseUrl}/issue/archive`);

  if (!html || html.includes('has not published any issues')) return [];

  const issues: OJSIssue[] = [];
  const issueBlocks = html.match(/<div[^>]*class="[^"]*obj_issue_summary[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];

  for (const block of issueBlocks) {
    const linkMatch = block.match(/href="[^"]*\/issue\/view\/(\d+)"/i);
    const titleMatch = block.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
    if (titleMatch) {
      const titleText = cleanHtml(titleMatch[1]);
      const volMatch = titleText.match(/Vol(?:ume)?\.?\s*(\d+)/i);
      const numMatch = titleText.match(/No\.?\s*(\d+)/i);
      const yearMatch = titleText.match(/\((\d{4})\)/);
      issues.push({
        id: linkMatch ? parseInt(linkMatch[1]) : issues.length + 1,
        volume: volMatch ? parseInt(volMatch[1]) : 1,
        number: numMatch ? parseInt(numMatch[1]) : issues.length + 1,
        year: yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear(),
        articles: [],
      });
    }
  }

  return issues;
}

// Get issue with articles
export async function getOJSIssue(journalPath: string, issueId: number): Promise<OJSIssue | null> {
  const baseUrl = `${OJS_BASE_URL}/index.php/${journalPath}`;
  const html = await fetchPage(`${baseUrl}/issue/view/${issueId}`);

  if (!html) return null;

  const volMatch = html.match(/Vol(?:ume)?\.?\s*(\d+)/i);
  const numMatch = html.match(/No\.?\s*(\d+)/i);
  const yearMatch = html.match(/\((\d{4})\)/);

  const articles: OJSArticle[] = [];
  const articleBlocks = html.match(/<div[^>]*class="[^"]*obj_article_summary[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];

  for (const block of articleBlocks) {
    const linkMatch = block.match(/href="[^"]*\/article\/view\/(\d+)"/i);
    const titleMatch = block.match(/<h[34][^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    const authorsMatch = block.match(/<div[^>]*class="[^"]*authors[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

    if (linkMatch && titleMatch) {
      articles.push({
        id: parseInt(linkMatch[1]),
        title: cleanHtml(titleMatch[1]),
        authors: authorsMatch ? cleanHtml(authorsMatch[1]).split(/[,;]/).map(a => a.trim()).filter(Boolean) : [],
      });
    }
  }

  return {
    id: issueId,
    volume: volMatch ? parseInt(volMatch[1]) : 1,
    number: numMatch ? parseInt(numMatch[1]) : 1,
    year: yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear(),
    articles,
  };
}
