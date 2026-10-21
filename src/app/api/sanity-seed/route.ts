import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/sanity/lib/client";
import { DEFAULT_SITE_CONTENT } from "@/sanity/lib/defaultData";

export async function GET() {
  return POST();
}

export async function POST() {
  const client = getSanityWriteClient();

  if (!client) {
    return NextResponse.json(
      {
        error:
          "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.",
      },
      { status: 400 }
    );
  }

  try {
    const transaction = client.transaction();

    // 1. Site & Hero Settings Singleton
    transaction.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      heroTitleLine1: DEFAULT_SITE_CONTENT.settings.heroTitleLine1,
      heroTitleLine2: DEFAULT_SITE_CONTENT.settings.heroTitleLine2,
      heroSubtitle: DEFAULT_SITE_CONTENT.settings.heroSubtitle,
      heroTagline: DEFAULT_SITE_CONTENT.settings.heroTagline,
      heroDescription: DEFAULT_SITE_CONTENT.settings.heroDescription,
      regionalOffices: DEFAULT_SITE_CONTENT.settings.regionalOffices.map(
        (office, idx) => ({
          _key: `office-${idx + 1}`,
          ...office,
        })
      ),
      stats: DEFAULT_SITE_CONTENT.settings.stats.map((stat, idx) => ({
        _key: `stat-${idx + 1}`,
        ...stat,
      })),
      whatWeDoHeadingLine1: DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine1,
      whatWeDoHeadingLine2: DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine2,
      whatWeDoHeadingLine3: DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine3,
      whatWeDoSubheading: DEFAULT_SITE_CONTENT.settings.whatWeDoSubheading,
      whatWeDoRightLines: DEFAULT_SITE_CONTENT.settings.whatWeDoRightLines,
      clientsDescription1: DEFAULT_SITE_CONTENT.settings.clientsDescription1,
      clientsDescription2: DEFAULT_SITE_CONTENT.settings.clientsDescription2,
      partnersSubtitle: DEFAULT_SITE_CONTENT.settings.partnersSubtitle,
      partnersDescription: DEFAULT_SITE_CONTENT.settings.partnersDescription,
      teamDescription: DEFAULT_SITE_CONTENT.settings.teamDescription,
      contactTitle: DEFAULT_SITE_CONTENT.settings.contactTitle,
      contactSubtitle: DEFAULT_SITE_CONTENT.settings.contactSubtitle,
      contactDescription: DEFAULT_SITE_CONTENT.settings.contactDescription,
    });

    // 2. Services Tabs Singleton
    transaction.createOrReplace({
      _id: "serviceSection",
      _type: "serviceSection",
      valuationsTitle: DEFAULT_SITE_CONTENT.services.valuations.title,
      valuationsParagraph1: DEFAULT_SITE_CONTENT.services.valuations.paragraph1,
      valuationsParagraph2: DEFAULT_SITE_CONTENT.services.valuations.paragraph2,
      valuationsCtaText: DEFAULT_SITE_CONTENT.services.valuations.ctaText,
      valuationsCategories: DEFAULT_SITE_CONTENT.services.valuations.categories,
      occupierTitleLine1: DEFAULT_SITE_CONTENT.services.occupier.titleLine1,
      occupierTitleLine2: DEFAULT_SITE_CONTENT.services.occupier.titleLine2,
      occupierLeadParagraph:
        DEFAULT_SITE_CONTENT.services.occupier.leadParagraph,
      occupierParagraphs: DEFAULT_SITE_CONTENT.services.occupier.paragraphs,
      capitalTitleLine1:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.titleLine1,
      capitalTitleLine2:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.titleLine2,
      capitalLeftSummary:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.leftSummary,
      capitalRightHeading1:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.rightHeading1,
      capitalClientTypes:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.clientTypes,
      capitalRightBody: DEFAULT_SITE_CONTENT.services.capitalMarkets.rightBody,
      capitalRightHeading2:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.rightHeading2,
      capitalTransactionLines:
        DEFAULT_SITE_CONTENT.services.capitalMarkets.transactionLines,
      researchTitleLine1: DEFAULT_SITE_CONTENT.services.research.titleLine1,
      researchTitleLine2: DEFAULT_SITE_CONTENT.services.research.titleLine2,
      researchParagraph1: DEFAULT_SITE_CONTENT.services.research.paragraph1,
      researchParagraph2: DEFAULT_SITE_CONTENT.services.research.paragraph2,
    });

    // 2.5 Network (Clients & Partners) Singleton
    transaction.createOrReplace({
      _id: "networkSection",
      _type: "networkSection",
      clientsDescription1: DEFAULT_SITE_CONTENT.settings.clientsDescription1,
      clientsDescription2: DEFAULT_SITE_CONTENT.settings.clientsDescription2,
      clientLogos: DEFAULT_SITE_CONTENT.settings.clientLogos.map((c, idx) => ({
        _key: `client-${idx + 1}`,
        ...c,
      })),
      partnersSubtitle: DEFAULT_SITE_CONTENT.settings.partnersSubtitle,
      partnersDescription: DEFAULT_SITE_CONTENT.settings.partnersDescription,
      partnerLogosPart1: (DEFAULT_SITE_CONTENT.settings.partnerLogosPart1 || []).map((p, idx) => ({
        _key: `partner-p1-${idx + 1}`,
        ...p,
      })),
      partnerLogosPart2: (DEFAULT_SITE_CONTENT.settings.partnerLogosPart2 || []).map((p, idx) => ({
        _key: `partner-p2-${idx + 1}`,
        ...p,
      })),
      partnerLogos: DEFAULT_SITE_CONTENT.settings.partnerLogos.map((p, idx) => ({
        _key: `partner-${idx + 1}`,
        ...p,
      })),
    });

    // 3. Newsroom Reports
    for (const report of DEFAULT_SITE_CONTENT.reports) {
      transaction.createOrReplace({
        _id: report._id,
        _type: "report",
        title: report.title,
        category: report.category,
        date: report.date,
        summary: report.summary,
        isFeatured: Boolean(report.isFeatured),
        order: report.order,
      });
    }

    // 4. Case Studies
    for (const cs of DEFAULT_SITE_CONTENT.caseStudies) {
      transaction.createOrReplace({
        _id: cs._id,
        _type: "caseStudy",
        categoryTag: cs.categoryTag,
        titleLines: cs.titleLines,
        description: cs.description,
        outcomeFootnote: cs.outcomeFootnote,
        order: cs.order,
      });
    }

    // 5. Leadership Team Members
    for (const member of DEFAULT_SITE_CONTENT.teamMembers) {
      transaction.createOrReplace({
        _id: member._id,
        _type: "teamMember",
        name: member.name,
        designation: member.designation,
        credentials: member.credentials,
        fallbackImagePath: member.image,
        order: member.order,
      });
    }

    await transaction.commit();

    return NextResponse.json({
      ok: true,
      message:
        "All default SFA website sections, reports, case studies, and leadership team profiles have been seeded into Sanity!",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to commit seed transaction to Sanity.",
      },
      { status: 500 }
    );
  }
}
