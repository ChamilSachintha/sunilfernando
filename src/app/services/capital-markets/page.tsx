import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import ServicePageClient from "@/components/ServicePageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Capital Markets Advisory",
  description:
    "Institutional investment advisory, acquisitions, disposals, joint ventures, debt & equity structuring, and cross-border hospitality and commercial real estate transactions.",
  alternates: {
    canonical: "/services/capital-markets",
  },
  openGraph: {
    title: "Capital Markets Advisory | Sunil Fernando & Associates",
    description:
      "Cross-border real estate investment advisory, acquisitions, disposals, and capital structuring across Sri Lanka, the Maldives, and the UAE.",
    url: "/services/capital-markets",
  },
};

export default async function CapitalMarketsPage() {
  const content = await getSiteContent();
  const cm = content.services.capitalMarkets;

  return (
    <ServicePageClient
      slug="capital-markets"
      content={content}
      eyebrow="CORE SERVICE • INVESTMENT & TRANSACTIONS"
      titleLine1={cm.titleLine1}
      titleLine2={cm.titleLine2}
      lead={cm.leftSummary}
      paragraphs={[
        cm.rightBody,
        "Combining deep regional market intelligence with direct access to institutional capital, family offices, private equity funds, and sovereign investors, Sunil Fernando & Associates advises on complex single-asset and portfolio transactions across commercial, hospitality, mixed-use, and industrial real estate.",
      ]}
      highlightsHeading={cm.rightHeading1}
      highlights={cm.clientTypes}
      secondaryHeading={cm.rightHeading2}
      secondaryItems={cm.transactionLines}
      imageUrl="/hero-skyline.jpg"
      imageAlt="Capital markets and institutional real estate transactions"
      ctaLabel="DISCUSS A TRANSACTION MANDATE"
      ctaAction="contact"
    />
  );
}
