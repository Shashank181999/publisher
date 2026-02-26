import { getHomepageContent, getConferences, getServices } from "@/lib/cms";
import HomeContent from "@/components/HomeContent";
import type { HomepageContent, CMSConference, CMSService } from "@/types/cms";

// Default homepage content fallback
const defaultHomepage: HomepageContent = {
  announcement: {
    enabled: true,
    icon: "📢",
    text: "Now Accepting Submissions for 2025!",
    buttonText: "Submit Now →",
    buttonLink: "/submissions"
  },
  featuredBanners: {
    title: "Our Flagship Journals",
    subtitle: "Publications",
    description: "Leading peer-reviewed publications in healthcare, technology, and sciences",
    banners: [
      { src: "/images/banner-allied-health.jpeg", name: "Allied Health Sciences" },
      { src: "/images/banner-medical-sciences.jpeg", name: "Medical Sciences" },
      { src: "/images/banner-cs-it.jpeg", name: "Computer Science & IT" },
      { src: "/images/banner-social-sciences.jpeg", name: "Social Sciences" }
    ],
    stats: [
      { icon: "📚", value: "5", label: "Active Journals" },
      { icon: "📝", value: "100+", label: "Published Articles" },
      { icon: "🌍", value: "50+", label: "Countries Reached" },
      { icon: "⭐", value: "98%", label: "Author Satisfaction" }
    ]
  },
  categories: {
    title: "Our Journals",
    subtitle: "Explore",
    description: "Peer-reviewed, open-access journals across multiple disciplines",
    items: [
      {
        title: "Allied Health Sciences",
        description: "Healthcare research, rehabilitation & allied health professions",
        journals: "BJAHS",
        featured: true,
        image: "/images/logo-allied-health.jpeg",
        link: "/journals/allied-health-sciences"
      },
      {
        title: "Medical Science",
        description: "Clinical medicine, healthcare innovations & medical research",
        journals: "BJMS",
        featured: true,
        image: "/images/logo-medical-sciences.jpeg",
        link: "/journals/medical-science"
      },
      {
        title: "Radiography & Operation Technology",
        description: "Medical imaging, surgical technology & perioperative care",
        journals: "BJROT",
        featured: false,
        image: "/images/logo-rehab-therapy.jpeg",
        link: "/journals/radiography-operation-technology"
      },
      {
        title: "Computer Science & Technology",
        description: "Software engineering, AI & technology innovation",
        journals: "BJCSTECH",
        featured: false,
        image: "/images/logo-cs-it.jpeg",
        link: "/journals/computer-science-technology"
      },
      {
        title: "Social Sciences",
        description: "Psychology, sociology & behavioral studies",
        journals: "BJSS",
        featured: false,
        image: "/images/logo-social-sciences.jpeg",
        link: "/journals/social-sciences"
      }
    ],
    viewAllText: "View All Journals",
    viewAllLink: "/journals"
  },
  latestArticles: {
    title: "Published Articles",
    subtitle: "Latest Research",
    description: "Recent publications from our peer-reviewed journals",
    limit: 5,
    viewAllText: "View All Articles",
    viewAllLink: "/archives"
  },
  whyPublish: {
    title: "Your Research Deserves Global Recognition",
    subtitle: "Why Choose Us",
    description: "We are committed to advancing scientific knowledge by publishing high-quality, peer-reviewed research that makes a real impact in academia and beyond.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    yearsExperience: "10+",
    features: ["Open Access", "Fast Peer Review", "DOI Assignment", "Global Indexing"],
    buttonText: "Learn More About Us",
    buttonLink: "/about"
  },
  videoBanner: {
    enabled: true,
    videoUrl: "/images/vidbanner.mp4",
    posterImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80",
    badge: "Now Accepting Submissions",
    title: {
      line1: "Shape the Future of",
      line2: "Academic Research"
    },
    description: "Join our global community of researchers, scientists, and academics making groundbreaking contributions to their fields.",
    primaryButton: {
      text: "Submit Your Research",
      link: "/submissions"
    },
    stats: [
      { value: "100+", label: "Published Articles" },
      { value: "50+", label: "Countries" },
      { value: "98%", label: "Author Satisfaction" }
    ]
  },
  servicesSection: {
    title: "Everything You Need to Publish",
    subtitle: "Complete Solutions",
    description: "From journals to books to conferences - we support your entire academic journey with professional services.",
    items: [
      { title: "Journals", description: "5 peer-reviewed", href: "/journals", icon: "📚" },
      { title: "Conferences", description: "Events & workshops", href: "/conferences", icon: "🎤" },
      { title: "Author Services", description: "Editing & support", href: "/author-services", icon: "✍️" },
      { title: "Book Publishing", description: "Academic books", href: "/books", icon: "📖" }
    ],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=100"
  },
  eventsSection: {
    title: "Upcoming Conferences",
    subtitle: "Events",
    viewAllText: "View All Events",
    viewAllLink: "/conferences"
  },
  authorServicesSection: {
    title: "Professional Support for Researchers",
    subtitle: "Author Services",
    description: "From manuscript editing to publication support, we help you succeed at every stage.",
    buttonText: "Explore All Services",
    buttonLink: "/author-services"
  },
  whyChooseUs: {
    title: "Why Choose Great Britain Publishers?",
    subtitle: "Why Us",
    description: "Committed to excellence in academic publishing",
    items: [
      { title: "Rigorous Review", description: "Double-blind peer review ensuring quality", icon: "🔍" },
      { title: "Global Reach", description: "Readers from 50+ countries worldwide", icon: "🌐" },
      { title: "Fast Process", description: "4-6 weeks average review time", icon: "⚡" },
      { title: "Full Support", description: "Dedicated editorial team assistance", icon: "💬" }
    ]
  },
  finalCta: {
    title: "Ready to Publish Your Research?",
    description: "Join thousands of researchers who trust Great Britain Publishers for their academic publications.",
    primaryButton: {
      text: "Submit Manuscript",
      link: "/submissions"
    },
    secondaryButton: {
      text: "Contact Us",
      link: "/contact"
    }
  }
};

// Default conferences fallback
const defaultConferences: CMSConference[] = [
  {
    id: "1",
    title: "International Conference on Healthcare Innovation",
    type: "conference",
    date: "2025-06-15",
    location: "London, UK",
    isVirtual: false,
    description: "Annual healthcare research conference",
    status: "upcoming",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Research Methodology Webinar",
    type: "webinar",
    date: "2025-04-20",
    location: "Online",
    isVirtual: true,
    description: "Learn research methodologies",
    status: "upcoming",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Academic Writing Workshop",
    type: "workshop",
    date: "2025-05-10",
    location: "Manchester, UK",
    isVirtual: false,
    description: "Improve your academic writing skills",
    status: "upcoming",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Publishing Best Practices Seminar",
    type: "seminar",
    date: "2025-07-01",
    location: "Birmingham, UK",
    isVirtual: false,
    description: "Learn from publishing experts",
    status: "upcoming",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Default services fallback
const defaultServices: CMSService[] = [
  {
    id: "1",
    name: "Manuscript Editing",
    slug: "manuscript-editing",
    description: "Professional editing services for your research papers",
    features: ["Grammar correction", "Style improvement", "Clarity enhancement"],
    icon: "✏️",
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Plagiarism Check",
    slug: "plagiarism-check",
    description: "Comprehensive plagiarism detection and report",
    features: ["Full document scan", "Detailed report", "Similarity score"],
    icon: "🔍",
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Translation Services",
    slug: "translation-services",
    description: "Academic translation by subject experts",
    features: ["Multiple languages", "Technical accuracy", "Fast turnaround"],
    icon: "🌐",
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Formatting Assistance",
    slug: "formatting-assistance",
    description: "Journal-specific formatting and styling",
    features: ["Citation formatting", "Layout adjustment", "Figure optimization"],
    icon: "📄",
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default async function Home() {
  // Fetch CMS data server-side
  const [homepageData, conferencesData, servicesData] = await Promise.all([
    getHomepageContent(),
    getConferences(),
    getServices()
  ]);

  // Use CMS data or fallback to defaults
  const homepage = homepageData || defaultHomepage;
  const conferences = conferencesData.length > 0 ? conferencesData : defaultConferences;
  const services = servicesData.length > 0 ? servicesData : defaultServices;

  return (
    <HomeContent
      homepage={homepage}
      conferences={conferences}
      services={services}
    />
  );
}
