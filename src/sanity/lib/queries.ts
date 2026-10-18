import { groq } from "next-sanity";
import { sanityClient } from "./client";
import {
  DEFAULT_SITE_CONTENT,
  type SanitySiteContent,
} from "./defaultData";

export const SITE_CONTENT_QUERY = groq`{
  "settings": *[_type == "siteSettings"][0]{
    heroTitleLine1,
    heroTitleLine2,
    heroSubtitle,
    heroTagline,
    heroDescription,
    "heroImages": heroSlides[].asset->url,
    regionalOffices,
    stats,
    whatWeDoHeadingLine1,
    whatWeDoHeadingLine2,
    whatWeDoHeadingLine3,
    whatWeDoSubheading,
    whatWeDoRightLines,
    clientsDescription1,
    clientsDescription2,
    partnersSubtitle,
    partnersDescription,
    teamDescription,
    contactTitle,
    contactSubtitle,
    contactDescription
  },
  "services": *[_type == "serviceSection"][0]{
    valuationsTitle,
    valuationsParagraph1,
    valuationsParagraph2,
    valuationsCtaText,
    valuationsCategories,
    occupierTitleLine1,
    occupierTitleLine2,
    occupierLeadParagraph,
    occupierParagraphs,
    "occupierImageUrl": occupierImage.asset->url,
    capitalTitleLine1,
    capitalTitleLine2,
    capitalLeftSummary,
    capitalRightHeading1,
    capitalClientTypes,
    capitalRightBody,
    capitalRightHeading2,
    capitalTransactionLines,
    researchTitleLine1,
    researchTitleLine2,
    researchParagraph1,
    researchParagraph2,
    "researchImageUrl": researchImage.asset->url
  },
  "reports": *[_type == "report"] | order(order asc){
    _id,
    title,
    category,
    date,
    summary,
    isFeatured,
    "fileUrl": coalesce(pdfFile.asset->url, externalUrl),
    order
  },
  "caseStudies": *[_type == "caseStudy"] | order(order asc){
    _id,
    categoryTag,
    titleLines,
    description,
    outcomeFootnote,
    order
  },
  "teamMembers": *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    designation,
    credentials,
    "image": coalesce(portrait.asset->url, fallbackImagePath, "/avatar-placeholder.svg"),
    order
  }
}`;

export async function getSiteContent(): Promise<SanitySiteContent> {
  if (!sanityClient) {
    return DEFAULT_SITE_CONTENT;
  }

  try {
    const raw = await sanityClient.fetch(
      SITE_CONTENT_QUERY,
      {},
      { cache: "no-store" }
    );

    if (!raw) return DEFAULT_SITE_CONTENT;

    const s = raw.settings || {};
    const srv = raw.services || {};

    return {
      settings: {
        heroTitleLine1: s.heroTitleLine1 || DEFAULT_SITE_CONTENT.settings.heroTitleLine1,
        heroTitleLine2: s.heroTitleLine2 || DEFAULT_SITE_CONTENT.settings.heroTitleLine2,
        heroSubtitle: s.heroSubtitle || DEFAULT_SITE_CONTENT.settings.heroSubtitle,
        heroTagline: s.heroTagline || DEFAULT_SITE_CONTENT.settings.heroTagline,
        heroDescription: s.heroDescription || DEFAULT_SITE_CONTENT.settings.heroDescription,
        heroImages:
          Array.isArray(s.heroImages) && s.heroImages.filter(Boolean).length > 0
            ? s.heroImages.filter(Boolean)
            : DEFAULT_SITE_CONTENT.settings.heroImages,
        regionalOffices:
          Array.isArray(s.regionalOffices) && s.regionalOffices.length > 0
            ? s.regionalOffices
            : DEFAULT_SITE_CONTENT.settings.regionalOffices,
        stats:
          Array.isArray(s.stats) && s.stats.length === 4
            ? s.stats
            : DEFAULT_SITE_CONTENT.settings.stats,
        whatWeDoHeadingLine1:
          s.whatWeDoHeadingLine1 || DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine1,
        whatWeDoHeadingLine2:
          s.whatWeDoHeadingLine2 || DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine2,
        whatWeDoHeadingLine3:
          s.whatWeDoHeadingLine3 || DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine3,
        whatWeDoSubheading:
          s.whatWeDoSubheading || DEFAULT_SITE_CONTENT.settings.whatWeDoSubheading,
        whatWeDoRightLines:
          Array.isArray(s.whatWeDoRightLines) && s.whatWeDoRightLines.length > 0
            ? s.whatWeDoRightLines
            : DEFAULT_SITE_CONTENT.settings.whatWeDoRightLines,
        clientsDescription1:
          s.clientsDescription1 || DEFAULT_SITE_CONTENT.settings.clientsDescription1,
        clientsDescription2:
          s.clientsDescription2 || DEFAULT_SITE_CONTENT.settings.clientsDescription2,
        partnersSubtitle:
          s.partnersSubtitle || DEFAULT_SITE_CONTENT.settings.partnersSubtitle,
        partnersDescription:
          s.partnersDescription || DEFAULT_SITE_CONTENT.settings.partnersDescription,
        teamDescription:
          s.teamDescription || DEFAULT_SITE_CONTENT.settings.teamDescription,
        contactTitle: s.contactTitle || DEFAULT_SITE_CONTENT.settings.contactTitle,
        contactSubtitle:
          s.contactSubtitle || DEFAULT_SITE_CONTENT.settings.contactSubtitle,
        contactDescription:
          s.contactDescription || DEFAULT_SITE_CONTENT.settings.contactDescription,
      },
      services: {
        valuations: {
          title: srv.valuationsTitle || DEFAULT_SITE_CONTENT.services.valuations.title,
          paragraph1:
            srv.valuationsParagraph1 ||
            DEFAULT_SITE_CONTENT.services.valuations.paragraph1,
          paragraph2:
            srv.valuationsParagraph2 ||
            DEFAULT_SITE_CONTENT.services.valuations.paragraph2,
          ctaText:
            srv.valuationsCtaText || DEFAULT_SITE_CONTENT.services.valuations.ctaText,
          categories:
            Array.isArray(srv.valuationsCategories) &&
            srv.valuationsCategories.length > 0
              ? srv.valuationsCategories
              : DEFAULT_SITE_CONTENT.services.valuations.categories,
        },
        occupier: {
          titleLine1:
            srv.occupierTitleLine1 || DEFAULT_SITE_CONTENT.services.occupier.titleLine1,
          titleLine2:
            srv.occupierTitleLine2 || DEFAULT_SITE_CONTENT.services.occupier.titleLine2,
          leadParagraph:
            srv.occupierLeadParagraph ||
            DEFAULT_SITE_CONTENT.services.occupier.leadParagraph,
          paragraphs:
            Array.isArray(srv.occupierParagraphs) &&
            srv.occupierParagraphs.length > 0
              ? srv.occupierParagraphs
              : DEFAULT_SITE_CONTENT.services.occupier.paragraphs,
          imageUrl:
            srv.occupierImageUrl || DEFAULT_SITE_CONTENT.services.occupier.imageUrl,
        },
        capitalMarkets: {
          titleLine1:
            srv.capitalTitleLine1 ||
            DEFAULT_SITE_CONTENT.services.capitalMarkets.titleLine1,
          titleLine2:
            srv.capitalTitleLine2 ||
            DEFAULT_SITE_CONTENT.services.capitalMarkets.titleLine2,
          leftSummary:
            srv.capitalLeftSummary ||
            DEFAULT_SITE_CONTENT.services.capitalMarkets.leftSummary,
          rightHeading1:
            srv.capitalRightHeading1 ||
            DEFAULT_SITE_CONTENT.services.capitalMarkets.rightHeading1,
          clientTypes:
            Array.isArray(srv.capitalClientTypes) &&
            srv.capitalClientTypes.length > 0
              ? srv.capitalClientTypes
              : DEFAULT_SITE_CONTENT.services.capitalMarkets.clientTypes,
          rightBody:
            srv.capitalRightBody ||
            DEFAULT_SITE_CONTENT.services.capitalMarkets.rightBody,
          rightHeading2:
            srv.capitalRightHeading2 ||
            DEFAULT_SITE_CONTENT.services.capitalMarkets.rightHeading2,
          transactionLines:
            Array.isArray(srv.capitalTransactionLines) &&
            srv.capitalTransactionLines.length > 0
              ? srv.capitalTransactionLines
              : DEFAULT_SITE_CONTENT.services.capitalMarkets.transactionLines,
        },
        research: {
          titleLine1:
            srv.researchTitleLine1 || DEFAULT_SITE_CONTENT.services.research.titleLine1,
          titleLine2:
            srv.researchTitleLine2 || DEFAULT_SITE_CONTENT.services.research.titleLine2,
          paragraph1:
            srv.researchParagraph1 || DEFAULT_SITE_CONTENT.services.research.paragraph1,
          paragraph2:
            srv.researchParagraph2 || DEFAULT_SITE_CONTENT.services.research.paragraph2,
          imageUrl:
            srv.researchImageUrl || DEFAULT_SITE_CONTENT.services.research.imageUrl,
        },
      },
      reports:
        Array.isArray(raw.reports) && raw.reports.length > 0
          ? raw.reports
          : DEFAULT_SITE_CONTENT.reports,
      caseStudies:
        Array.isArray(raw.caseStudies) && raw.caseStudies.length > 0
          ? raw.caseStudies
          : DEFAULT_SITE_CONTENT.caseStudies,
      teamMembers:
        Array.isArray(raw.teamMembers) && raw.teamMembers.length > 0
          ? raw.teamMembers
          : DEFAULT_SITE_CONTENT.teamMembers,
    };
  } catch (err) {
    console.warn("Sanity fetch fallback to default content:", err);
    return DEFAULT_SITE_CONTENT;
  }
}
