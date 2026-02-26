// CMS Type Definitions for Great Britain Publishers

// Hero Section
export interface HeroContent {
  badge: {
    text: string;
    icon: 'pulse' | 'star' | 'bell';
  };
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  backgroundImage: string;
  backgroundVideo: string;
  useVideo: boolean;
}

// About Section
export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  teamImage: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

// Journal
export interface CMSJournal {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  issn: string;
  category: 'ahs' | 'medical' | 'social' | 'other';
  description: string;
  coverImage: string;
  editorInChief: {
    name: string;
    affiliation: string;
    email: string;
  };
  impactFactor?: string;
  frequency: string;
  established: number;
  subjects: string[];
  ojsPath?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Article
export interface CMSArticle {
  id: string;
  title: string;
  authors: Array<{
    name: string;
    affiliation: string;
    email?: string;
  }>;
  abstract: string;
  keywords: string[];
  doi: string;
  pdfUrl: string;
  category: string;
  journalId?: string;
  volume: number;
  issue: number;
  year: number;
  pages: string;
  publishedDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Service
export interface CMSService {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  price?: string;
  icon: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Conference/Event
export interface CMSConference {
  id: string;
  title: string;
  type: 'conference' | 'seminar' | 'webinar' | 'workshop';
  date: string;
  endDate?: string;
  location: string;
  isVirtual: boolean;
  description: string;
  registrationLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Books Section
export interface BooksContent {
  title: string;
  subtitle: string;
  description: string;
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  featuredBooks: Array<{
    id: string;
    title: string;
    author: string;
    coverImage: string;
    description: string;
    buyLink?: string;
  }>;
}

// Contact Information
export interface ContactContent {
  company: {
    name: string;
    tagline: string;
  };
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  contact: {
    email: string;
    alternateEmail?: string;
    phone: string;
    whatsapp?: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  mapEmbed?: string;
}

// Footer Content
export interface FooterContent {
  description: string;
  quickLinks: Array<{
    label: string;
    href: string;
  }>;
  journalLinks: Array<{
    label: string;
    href: string;
  }>;
  resourceLinks: Array<{
    label: string;
    href: string;
  }>;
  copyright: string;
  bottomLinks: Array<{
    label: string;
    href: string;
  }>;
}

// Media Item
export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  url: string;
  type: 'image' | 'video' | 'document';
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  uploadedAt: string;
}

// Media Library
export interface MediaLibrary {
  items: MediaItem[];
}

// Homepage Content
export interface HomepageContent {
  announcement: {
    enabled: boolean;
    icon: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  featuredBanners: {
    title: string;
    subtitle: string;
    description: string;
    banners: Array<{
      src: string;
      name: string;
    }>;
    stats: Array<{
      icon: string;
      value: string;
      label: string;
    }>;
  };
  categories: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      journals: string;
      featured: boolean;
      image: string;
      link: string;
    }>;
    viewAllText: string;
    viewAllLink: string;
  };
  latestArticles: {
    title: string;
    subtitle: string;
    description: string;
    limit: number;
    viewAllText: string;
    viewAllLink: string;
  };
  whyPublish: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    yearsExperience: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
  };
  videoBanner: {
    enabled: boolean;
    videoUrl: string;
    posterImage: string;
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  servicesSection: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      href: string;
      icon: string;
    }>;
    image: string;
  };
  eventsSection: {
    title: string;
    subtitle: string;
    viewAllText: string;
    viewAllLink: string;
  };
  authorServicesSection: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  finalCta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}

// All CMS Data
export interface CMSData {
  hero: HeroContent;
  about: AboutContent;
  journals: { items: CMSJournal[] };
  articles: { items: CMSArticle[] };
  services: { items: CMSService[] };
  conferences: { items: CMSConference[] };
  books: BooksContent;
  contact: ContactContent;
  footer: FooterContent;
  media: MediaLibrary;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Session Types
export interface AdminSession {
  isAuthenticated: boolean;
  expiresAt: number;
}
