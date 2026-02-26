/**
 * GET /api/articles
 * Fetch published articles from all OJS journals
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPublishedArticles, getPublishedArticles } from '@/utils/ojsApi';

// Sample articles for preview (remove this after real articles are published)
const PREVIEW_ARTICLES = [
  {
    id: 1,
    title: "Effectiveness of Telerehabilitation in Post-Stroke Recovery: A Systematic Review",
    abstract: "This systematic review examines the effectiveness of telerehabilitation interventions for stroke survivors. Analysis of 45 randomized controlled trials demonstrates significant improvements in motor function and quality of life outcomes.",
    authors: ["Dr. Sarah Mitchell", "Prof. James Anderson", "Dr. Maria Garcia"],
    doi: "10.1234/bjahs.2024.001",
    publishedDate: "2024-12-15",
    journalId: "bjahs",
    journalName: "Britain Journal of Allied Health Sciences"
  },
  {
    id: 2,
    title: "Artificial Intelligence in Medical Diagnostics: Current Applications and Future Perspectives",
    abstract: "This comprehensive review explores the integration of artificial intelligence in medical diagnostics, examining current clinical applications in radiology, pathology, and dermatology with promising accuracy rates.",
    authors: ["Dr. Ahmed Khan", "Dr. Emily Roberts"],
    doi: "10.1234/bjms.2024.001",
    publishedDate: "2024-12-10",
    journalId: "bjms",
    journalName: "Britain Journal of Medical Science"
  },
  {
    id: 3,
    title: "Advances in Digital Radiography: Image Quality Optimization Techniques",
    abstract: "This study investigates modern optimization techniques in digital radiography, focusing on dose reduction while maintaining diagnostic image quality in clinical settings.",
    authors: ["Prof. David Wilson", "Dr. Lisa Chen"],
    doi: "10.1234/bjrot.2024.001",
    publishedDate: "2024-12-08",
    journalId: "bjrot",
    journalName: "Britain Journal of Radiography & Operation Technology"
  },
  {
    id: 4,
    title: "Machine Learning Approaches for Cybersecurity Threat Detection",
    abstract: "This research presents novel machine learning algorithms for real-time cybersecurity threat detection, achieving 97.8% accuracy in identifying malicious network activities.",
    authors: ["Dr. Michael Brown", "Dr. Priya Sharma", "Dr. Alex Turner"],
    doi: "10.1234/bjcstech.2024.001",
    publishedDate: "2024-12-05",
    journalId: "bjcstech",
    journalName: "Britain Journal of Computer Science & Technology"
  },
  {
    id: 5,
    title: "Impact of Social Media on Adolescent Mental Health: A Cross-Cultural Study",
    abstract: "This cross-cultural study examines the relationship between social media usage patterns and mental health outcomes among adolescents across five countries, revealing significant correlations.",
    authors: ["Dr. Jennifer Lee", "Prof. Hassan Ali"],
    doi: "10.1234/bjss.2024.001",
    publishedDate: "2024-12-01",
    journalId: "bjss",
    journalName: "Britain Journal of Social Sciences"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const journalId = searchParams.get('journal');
    const limit = parseInt(searchParams.get('limit') || '20');
    const preview = searchParams.get('preview') === 'true';

    // If preview mode, return sample articles
    if (preview) {
      const articles = journalId
        ? PREVIEW_ARTICLES.filter(a => a.journalId === journalId)
        : PREVIEW_ARTICLES;
      return NextResponse.json({
        articles: articles.slice(0, limit),
        count: articles.length,
        preview: true
      });
    }

    if (journalId) {
      // Fetch from specific journal
      const result = await getPublishedArticles(journalId, { limit });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to fetch articles' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        articles: result.articles,
        journal: journalId,
        count: result.articles.length,
      });
    }

    // Fetch from all journals
    const result = await getAllPublishedArticles({ limit });

    return NextResponse.json({
      articles: result.articles,
      count: result.articles.length,
      errors: result.errors,
    });
  } catch (error) {
    console.error('API articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
