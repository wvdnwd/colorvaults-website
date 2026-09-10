import { SITE_ORIGIN } from '@/lib/site';

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function buildWebsiteAndOrgSchema(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/${lang}`,
        name: 'ColorVaults',
        description:
          lang === 'nl'
            ? 'Gratis printbare kleurplaten voor kinderen en volwassenen'
            : 'Free printable coloring pages for kids and adults',
        inLanguage: lang,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_ORIGIN}/${lang}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'ColorVaults',
        url: SITE_ORIGIN,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_ORIGIN}/images/og-share.jpg`,
          width: 1200,
          height: 630,
        },
      },
    ],
  };
}

export function buildCollectionSchema({
  title,
  description,
  url,
  items,
}: {
  title: string;
  description: string;
  url: string;
  items?: Array<{ name: string; url: string }>;
}) {
  const graph: any[] = [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    },
  ];

  if (items && items.length > 0) {
    graph.push({
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildColoringPageDetailSchema({
  title,
  description,
  pageUrl,
  imageUrl,
  themeTitle,
  themeUrl,
  hubTitle,
  hubUrl,
}: {
  title: string;
  description: string;
  pageUrl: string;
  imageUrl: string;
  themeTitle: string;
  themeUrl: string;
  hubTitle: string;
  hubUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${title} Coloring Page`,
        description,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        mainEntity: {
          '@type': 'ImageObject',
          '@id': `${pageUrl}#primaryimage`,
          name: title,
          description,
          contentUrl: imageUrl,
          url: imageUrl,
          isAccessibleForFree: true,
          license: `${SITE_ORIGIN}/en/terms-of-service`,
          acquireLicensePage: `${SITE_ORIGIN}/en/licensing`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_ORIGIN,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: hubTitle,
            item: hubUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: themeTitle,
            item: themeUrl,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function buildWebApplicationSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function buildLearningResourceSchema({
  name,
  description,
  url,
  educationalLevel = 'Preschool, Elementary',
}: {
  name: string;
  description: string;
  url: string;
  educationalLevel?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    url,
    educationalLevel,
    isAccessibleForFree: true,
    learningResourceType: 'worksheet',
  };
}
