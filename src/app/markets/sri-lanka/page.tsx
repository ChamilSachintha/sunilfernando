import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import MarketPageClient from "@/components/MarketPageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Real Estate Valuation & Advisory in Sri Lanka",
  description:
    "Sri Lanka's largest independent real estate consultancy offering RICS & IVSL compliant property valuations, plant & machinery appraisals, occupier services, capital markets, and research.",
  alternates: {
    canonical: "/markets/sri-lanka",
  },
  openGraph: {
    title: "Real Estate Valuation & Advisory in Sri Lanka | Sunil Fernando & Associates",
    description:
      "Over 25 years of RICS & IVSL compliant real estate valuation, capital markets, occupier services, and research across Sri Lanka and Port City Colombo.",
    url: "/markets/sri-lanka",
  },
};

export default async function SriLankaMarketPage() {
  const content = await getSiteContent();

  return (
    <MarketPageClient
      slug="sri-lanka"
      content={content}
      countryTitle="SRI LANKA"
      eyebrow="REGIONAL MARKET • HEADQUARTERS SINCE 1999"
      flagUrl="/flag-lk.png"
      lead="Sri Lanka's largest independent real estate consultancy, delivering RICS and IVSL compliant valuations, occupier services, capital markets, and market research island-wide since 1999."
      paragraphs={[
        "Headquartered in Colombo (Rajagiriya), Sunil Fernando & Associates completes thousands of valuation and advisory assignments annually across all nine provinces of Sri Lanka — from Grade-A Colombo CBD office towers and Port City Colombo developments to industrial estates, luxury hotels, and heritage plantations.",
        "Our reports are accepted by leading local and international commercial banks, Big Four audit firms, institutional investors, legal counsel, and multinational corporations for mortgage lending, IFRS reporting, corporate restructuring, and dispute resolution.",
      ]}
      focusHeading="KEY SRI LANKA SECTORS & MANDATES"
      focusAreas={[
        "Colombo CBD & Port City Colombo Commercial Assets",
        "Commercial Bank Collateral & Panel Valuations",
        "Tourism, Resorts & Boutique Hospitality",
        "Industrial Warehousing, Factories & Plant/Machinery",
        "Agricultural Estates & Heritage Plantations",
        "Litigation Support & Court Expert Testimony",
      ]}
      officeAddress="No. 505, Nawala Road, Rajagiriya, Sri Lanka"
      phoneDisplay="+94 11 2887829"
      phoneHref="+94112887829"
      email="info@sunilfernando.com"
      accreditations={["RICS REGULATED", "IVSL ACCREDITED", "26+ YEARS EXPERIENCE"]}
    />
  );
}
