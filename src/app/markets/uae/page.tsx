import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import MarketPageClient from "@/components/MarketPageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Real Estate Valuation & Advisory in Dubai, UAE",
  description:
    "RICS and RERA compliant real estate valuation, commercial property appraisals, capital markets, and advisory services in Dubai and across the United Arab Emirates.",
  alternates: {
    canonical: "/markets/uae",
  },
  openGraph: {
    title: "Real Estate Valuation & Advisory in Dubai, UAE | Sunil Fernando & Associates",
    description:
      "Independent RICS & RERA compliant real estate valuation, investment advisory, and occupier services in Dubai, UAE.",
    url: "/markets/uae",
  },
};

export default async function UaeMarketPage() {
  const content = await getSiteContent();

  return (
    <MarketPageClient
      slug="uae"
      content={content}
      countryTitle="DUBAI, UAE"
      eyebrow="REGIONAL MARKET • UNITED ARAB EMIRATES"
      flagUrl="/flag-ae.png"
      lead="RICS and RERA compliant real estate valuation, institutional investment advisory, and commercial occupier services from our Dubai CommerCity office serving the United Arab Emirates and GCC."
      paragraphs={[
        "Operating from Dubai CommerCity, Sunil Fernando & Associates delivers independent property valuations, corporate asset appraisals, and cross-border real estate advisory tailored to the UAE's dynamic commercial, hospitality, logistics, and residential sectors.",
        "Our UAE practice serves international and regional banks, sovereign and institutional investors, private family offices, and multinational occupiers requiring Red Book and RERA-compliant valuation reports, development feasibility studies, and capital markets transaction support.",
      ]}
      focusHeading="KEY UAE SECTORS & MANDATES"
      focusAreas={[
        "Commercial Office & Mixed-Use Towers",
        "Luxury Hospitality & Serviced Residences",
        "Industrial, Logistics & Free Zone Assets",
        "Bank Collateral & Refinancing Appraisals",
        "IFRS Fair Value & Audit Support",
        "Cross-Border GCC – South Asia Capital Flows",
      ]}
      officeAddress="Office #1029, Building B-2, Level 1, Dubai CommerCity, Umm Ramool, Dubai, UAE"
      phoneDisplay="+971 4 894 2444"
      phoneHref="+97148942444"
      email="enquiries@sunilfernando.com"
      accreditations={["RICS REGULATED", "RERA COMPLIANT", "IVS STANDARDS"]}
    />
  );
}
