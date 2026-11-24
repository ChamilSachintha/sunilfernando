import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import MarketPageClient from "@/components/MarketPageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resort Valuation & Real Estate Advisory in the Maldives",
  description:
    "RICS Red Book compliant luxury resort island valuations, hospitality refinancing appraisals, head-lease analysis, and tourism investment advisory in the Republic of Maldives.",
  alternates: {
    canonical: "/markets/maldives",
  },
  openGraph: {
    title: "Resort Valuation & Real Estate Advisory in the Maldives | Sunil Fernando & Associates",
    description:
      "Independent RICS compliant resort island valuations, hospitality advisory, and lender-ready appraisals across the Maldives.",
    url: "/markets/maldives",
  },
};

export default async function MaldivesMarketPage() {
  const content = await getSiteContent();

  return (
    <MarketPageClient
      slug="maldives"
      content={content}
      countryTitle="THE MALDIVES"
      eyebrow="REGIONAL MARKET • REPUBLIC OF MALDIVES"
      flagUrl="/flag-mv.png"
      lead="Specialized RICS Red Book compliant resort island valuations, cross-border hospitality refinancing appraisals, and tourism investment advisory across the Republic of Maldives."
      paragraphs={[
        "Through Sunil Fernando & Associates Maldives Pvt Ltd in Malé City, we are a trusted independent valuation and advisory partner to international hotel groups, European and regional commercial banks, institutional lenders, and resort developers across the Maldivian archipelago.",
        "Our hospitality specialists combine forensic multi-currency Discounted Cash Flow (DCF) modelling, sovereign head-lease tenure analysis under Maldivian tourism law, and physical plant & machinery inspections to deliver lender-grade appraisals for acquisitions, refinancing, and financial reporting.",
      ]}
      focusHeading="KEY MALDIVES SECTORS & MANDATES"
      focusAreas={[
        "Ultra-Luxury & Five-Star Resort Islands",
        "Cross-Border Syndicated Debt & Refinancing",
        "Sovereign Head-Lease & Lagoon Valuations",
        "Greenfield Resort Development Feasibility",
        "Hospitality Plant, Machinery & Marine Assets",
        "IFRS Financial Reporting & Impairment Audits",
      ]}
      officeAddress="Sunil Fernando & Associates Maldives Pvt Ltd, Malé City, Republic of Maldives"
      email="info@sunilfernando.com"
      accreditations={["RICS RED BOOK", "IVS STANDARDS", "HOSPITALITY SPECIALISTS"]}
    />
  );
}
