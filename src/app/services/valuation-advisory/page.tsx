import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import ServicePageClient from "@/components/ServicePageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Valuation & Advisory Services",
  description:
    "RICS, RERA and IVSL compliant real estate, plant & machinery, hospitality, commercial, and corporate asset valuation services across Sri Lanka, the Maldives, and the UAE.",
  alternates: {
    canonical: "/services/valuation-advisory",
  },
  openGraph: {
    title: "Valuation & Advisory Services | Sunil Fernando & Associates",
    description:
      "Independent RICS & IVSL compliant real estate valuation and advisory accepted by leading banks, audit firms, and institutional investors across Sri Lanka, the Maldives, and the UAE.",
    url: "/services/valuation-advisory",
  },
};

export default async function ValuationAdvisoryPage() {
  const content = await getSiteContent();
  const v = content.services.valuations;

  return (
    <ServicePageClient
      slug="valuation-advisory"
      content={content}
      eyebrow="CORE SERVICE • RICS & IVSL ACCREDITED"
      titleLine1="VALUATION &"
      titleLine2="ADVISORY"
      lead="Independent, internationally accepted property and asset valuations trusted by commercial banks, Big Four audit firms, institutional investors, and legal counsel for over 25 years."
      paragraphs={[
        v.paragraph1,
        v.paragraph2,
        "Every valuation assignment is delivered in strict accordance with RICS Valuation – Global Standards (Red Book), International Valuation Standards (IVS), RERA Dubai guidelines, and Institute of Valuers of Sri Lanka (IVSL) standards — ensuring full defensibility for bank lending, IFRS financial reporting, M&A transactions, and court proceedings.",
      ]}
      highlightsHeading="ASSET CLASSES & VALUATION SCOPE"
      highlights={v.categories}
      secondaryHeading="KEY VALUATION PURPOSES"
      secondaryItems={[
        "Secured Lending & Bank Collateral Appraisals",
        "Financial Reporting (IFRS / LKAS Fair Value)",
        "Mergers, Acquisitions & Portfolio Restructuring",
        "Litigation Support & Expert Witness Testimony",
        "Insurance Replacement Cost & Asset Registers",
      ]}
      imageUrl={content.settings.whatWeDoImageUrl || "/hero-skyline.jpg"}
      imageAlt="Commercial real estate valuation and advisory"
      ctaLabel={v.ctaText || "REQUEST A VALUATION"}
      ctaAction="valuation"
    />
  );
}
