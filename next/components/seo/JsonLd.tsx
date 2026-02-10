import type { Dictionary } from "@/dictionaries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nopeca.com";

interface JsonLdProps {
  locale: string;
  dict: Dictionary;
}

export default function JsonLd({ locale, dict }: JsonLdProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Nopeca",
    url: SITE_URL,
    logo: `${SITE_URL}/singl_logo_colord_white_background@4x.png`,
    description: dict.seo.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boumerdes",
      addressCountry: "DZ",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+213-560-409-193",
        contactType: "customer service",
        availableLanguage: ["English", "French", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+213-561-799-531",
        contactType: "customer service",
        contactOption: "https://wa.me/213561799531",
        availableLanguage: ["English", "French", "Arabic"],
      },
    ],
    sameAs: [
      "https://instagram.com/nopeca",
      "https://linkedin.com/company/nopeca",
    ],
    areaServed: {
      "@type": "Country",
      name: "Algeria",
    },
    serviceType: "Study Abroad Consulting",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nopeca",
    url: SITE_URL,
    inLanguage: [locale === "fr" ? "fr-DZ" : "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}#contact`,
      "query-input": "required name=search_term_string",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          locale === "fr"
            ? "Comment Nopeca aide les étudiants algériens à étudier à l'étranger ?"
            : "How does Nopeca help Algerian students study abroad?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "fr"
              ? "Nopeca accompagne les étudiants algériens de A à Z : sélection de l'université, candidature, visa, vol et accompagnement à l'arrivée au Royaume-Uni."
              : "Nopeca provides end-to-end support for Algerian students: university selection, application, visa processing, flight booking, and 1-to-1 arrival support in the UK.",
        },
      },
      {
        "@type": "Question",
        name:
          locale === "fr"
            ? "Quelles universités britanniques sont accessibles via Nopeca ?"
            : "Which UK universities can I access through Nopeca?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "fr"
              ? "Nopeca travaille avec les meilleures universités du Royaume-Uni, notamment Oxford, Cambridge, UCL, Oxford Brookes et Royal Holloway."
              : "Nopeca works with top UK universities including Oxford, Cambridge, UCL, Oxford Brookes, and Royal Holloway.",
        },
      },
      {
        "@type": "Question",
        name:
          locale === "fr"
            ? "Nopeca aide-t-il avec le visa UK depuis l'Algérie ?"
            : "Does Nopeca help with UK visa applications from Algeria?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "fr"
              ? "Oui, Nopeca gère l'intégralité du processus de visa UK : préparation des documents, réservation de vol et tous les détails de voyage."
              : "Yes, Nopeca handles the entire UK visa process: document preparation, flight booking, and all travel logistics.",
        },
      },
      {
        "@type": "Question",
        name:
          locale === "fr"
            ? "Où se trouve Nopeca en Algérie ?"
            : "Where is Nopeca located in Algeria?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "fr"
              ? "Nopeca est basé à Boumerdès, Algérie. Vous pouvez nous contacter par téléphone, WhatsApp ou via notre formulaire en ligne."
              : "Nopeca is based in Boumerdes, Algeria. You can reach us by phone, WhatsApp, or through our online contact form.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
