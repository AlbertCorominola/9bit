const SITE = 'https://9-bit.com';

const DESCRIPTIONS: Record<string, string> = {
  ca: 'Infraestructura digital amb IA per a empreses: webs, agents telefònics, chatbots i automatitzacions. A Girona des del 2001.',
  es: 'Infraestructura digital con IA para empresas: webs, agentes telefónicos, chatbots y automatizaciones. En Girona desde 2001.',
  en: 'AI-powered digital infrastructure for businesses: websites, phone agents, chatbots and automations. In Girona since 2001.',
};

const SERVICE_NAMES: Record<string, string[]> = {
  ca: ['Desenvolupament Web', 'Agents Telefònics IA', 'Chatbots IA', 'Automatització', 'Infraestructura IA', 'Consultoria IA', 'Suport IT', 'Formació'],
  es: ['Desarrollo Web', 'Agentes Telefónicos IA', 'Chatbots IA', 'Automatización', 'Infraestructura IA', 'Consultoría IA', 'Soporte IT', 'Formación'],
  en: ['Web Development', 'AI Phone Agents', 'AI Chatbots', 'Automation', 'AI Infrastructure', 'AI Consulting', 'IT Support', 'Training'],
};

export default function StructuredData({ locale }: { locale: string }) {
  const lang = DESCRIPTIONS[locale] ? locale : 'es';

  const graph = [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}/#business`,
      name: '9bit',
      legalName: '9bit — Building Information Technologies',
      url: `${SITE}/${lang}`,
      description: DESCRIPTIONS[lang],
      email: 'hola@9-bit.com',
      logo: `${SITE}/logo_9bit_sin_fondo.png`,
      image: `${SITE}/opengraph-image`,
      knowsLanguage: ['ca', 'es', 'en'],
      telephone: '+34637400350',
      foundingDate: '2001',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Girona',
        addressRegion: 'Catalunya',
        addressCountry: 'ES',
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Girona' },
        { '@type': 'AdministrativeArea', name: 'Catalunya' },
        { '@type': 'Country', name: 'España' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: [
        'https://instagram.com/9bitinf',
        'https://x.com/9bitinf',
        'https://linkedin.com/company/9-bit',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: DESCRIPTIONS[lang],
        itemListElement: SERVICE_NAMES[lang].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/${lang}`,
      name: '9bit',
      inLanguage: lang,
      publisher: { '@id': `${SITE}/#business` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // El contenido es estático y definido aquí, no entra nada del usuario.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
