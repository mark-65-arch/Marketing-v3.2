// 🔍 SEO Utilities
// Purpose: Centralized SEO configuration and structured data generation
// Features: Meta tag generation, structured data, sitemap helpers

export interface SEOConfig {
  title: string;
  description: string;
  canonicalURL?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceSchema {
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed: string;
  priceRange?: string;
}

// 🏢 Business Information
export const BUSINESS_INFO = {
  name: 'Marketing AI Houston',
  description: 'AI-powered web design & SEO for Houston small businesses',
  url: 'https://marketingaihouston.com',
  logo: 'https://marketingaihouston.com/logo.png',
  phone: '+1-281-544-0572',
  email: 'team@marketingaihouston.com',
  address: {
    streetAddress: '',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '',
    addressCountry: 'US'
  },
  geo: {
    latitude: '29.7604',
    longitude: '-95.3698'
  },
  socialProfiles: [
    'https://www.facebook.com/marketingaihouston',
    'https://www.linkedin.com/company/marketingaihouston',
    'https://twitter.com/marketingaihou'
  ],
  foundingDate: '2024',
  serviceArea: ['Houston', 'Texas', 'United States'],
  priceRange: '$500-$5000'
} as const;

// 🎯 Default SEO Configuration
export const DEFAULT_SEO = {
  title: 'Marketing AI Houston - AI-Powered Web Design & SEO for Small Businesses',
  description: 'Professional web design and SEO services powered by AI technology for Houston small businesses. Get found online with modern, conversion-focused websites.',
  ogType: 'website' as const,
  keywords: [
    'web design Houston',
    'SEO Houston',
    'small business marketing',
    'AI web design',
    'local SEO',
    'Google Business Profile',
    'website development'
  ],
  author: 'Marketing AI Houston Team'
};

// 🏢 Generate LocalBusiness Schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_INFO.url}#business`,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.logo,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    foundingDate: BUSINESS_INFO.foundingDate,
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      addressCountry: BUSINESS_INFO.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude
    },
    areaServed: BUSINESS_INFO.serviceArea.map(area => ({
      '@type': 'Place',
      name: area
    })),
    serviceType: [
      'Web Design',
      'Search Engine Optimization',
      'Digital Marketing',
      'Local SEO',
      'Google Business Profile Optimization'
    ],
    sameAs: BUSINESS_INFO.socialProfiles,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design & Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Design',
            description: 'Mobile-optimized, conversion-focused websites'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local SEO',
            description: 'Help businesses get found in local searches'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Google Business Profile',
            description: 'Optimization and management services'
          }
        }
      ]
    }
  };
}

// 🍞 Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// ❓ Generate FAQ Schema
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// 🛠️ Generate Service Schema
export function generateServiceSchema(service: ServiceSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: service.provider,
      url: BUSINESS_INFO.url
    },
    serviceType: service.serviceType,
    areaServed: {
      '@type': 'Place',
      name: service.areaServed
    },
    ...(service.priceRange && { priceRange: service.priceRange })
  };
}

// 📄 Generate Article Schema (for blog posts)
export function generateArticleSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  author = BUSINESS_INFO.name,
  image
}: {
  title: string;
  description: string;
  url: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: BUSINESS_INFO.url
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo
      }
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image
      }
    }),
    mainEntityOfPage: url
  };
}

// 🎯 Generate OpenGraph Tags
export function generateOpenGraphTags(config: SEOConfig) {
  const tags = [
    { property: 'og:type', content: config.ogType || 'website' },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:url', content: config.canonicalURL || '' },
    { property: 'og:site_name', content: BUSINESS_INFO.name }
  ];

  if (config.ogImage) {
    tags.push({ property: 'og:image', content: config.ogImage });
    tags.push({ property: 'og:image:alt', content: `${config.title} - ${BUSINESS_INFO.name}` });
  }

  if (config.publishedTime) {
    tags.push({ property: 'article:published_time', content: config.publishedTime });
  }

  if (config.modifiedTime) {
    tags.push({ property: 'article:modified_time', content: config.modifiedTime });
  }

  return tags;
}

// 🐦 Generate Twitter Card Tags
export function generateTwitterCardTags(config: SEOConfig) {
  const tags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description }
  ];

  if (config.ogImage) {
    tags.push({ name: 'twitter:image', content: config.ogImage });
  }

  return tags;
}

// 🗺️ Sitemap Helper Functions
export function generateSitemapEntry({
  url,
  lastModified = new Date(),
  changeFrequency = 'monthly',
  priority = 0.5
}: {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}) {
  return {
    url,
    lastModified: lastModified.toISOString(),
    changeFrequency,
    priority
  };
}

// 🏷️ Generate Keywords for SEO
export function generateKeywords(baseKeywords: string[], location?: string): string[] {
  const locationKeywords = location
    ? baseKeywords.flatMap(keyword => [
        `${keyword} ${location}`,
        `${keyword} near ${location}`,
        `best ${keyword} ${location}`
      ])
    : [];

  return [...baseKeywords, ...locationKeywords].slice(0, 15); // Limit to 15 keywords
}

// 🎯 SEO Score Calculator (for development/testing)
export function calculateSEOScore(config: SEOConfig): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Title checks
  if (!config.title) {
    issues.push('Missing title');
    score -= 20;
  } else {
    if (config.title.length < 30) {
      recommendations.push('Consider a longer, more descriptive title (30-60 characters)');
      score -= 5;
    }
    if (config.title.length > 60) {
      issues.push('Title too long (>60 characters)');
      score -= 10;
    }
  }

  // Description checks
  if (!config.description) {
    issues.push('Missing meta description');
    score -= 15;
  } else {
    if (config.description.length < 120) {
      recommendations.push('Consider a longer meta description (120-160 characters)');
      score -= 5;
    }
    if (config.description.length > 160) {
      issues.push('Meta description too long (>160 characters)');
      score -= 10;
    }
  }

  // Image checks
  if (!config.ogImage) {
    recommendations.push('Add an Open Graph image for better social sharing');
    score -= 5;
  }

  // Canonical URL
  if (!config.canonicalURL) {
    recommendations.push('Add canonical URL to prevent duplicate content issues');
    score -= 5;
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    issues,
    recommendations
  };
}