import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import ServicePageClient from "@/components/ServicePageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Real Estate Research Services",
  description:
    "Independent real estate market research, feasibility studies, highest-and-best-use analysis, and bespoke property intelligence across Sri Lanka, the Maldives, and the UAE.",
  alternates: {
    canonical: "/services/research-services",
  },
  openGraph: {
    title: "Real Estate Research Services | Sunil Fernando & Associates",
    description:
      "Data-driven real estate research, feasibility studies, and market intelligence across Sri Lanka, the Maldives, and the UAE.",
    url: "/services/research-services",
  },
};

export default async function ResearchServicesPage() {
  const content = await getSiteContent();
  const res = content.services.research;

  return (
    <ServicePageClient
      slug="research-services"
      content={content}
      eyebrow="CORE SERVICE • MARKET INTELLIGENCE"
      titleLine1={res.titleLine1}
      titleLine2={res.titleLine2}
      lead="Independent, data-driven real estate intelligence, development feasibility studies, and sector outlooks built on over 25 years of proprietary transaction and valuation data."
      paragraphs={[res.paragraph1, res.paragraph2]}
      highlightsHeading="RESEARCH & FEASIBILITY DELIVERABLES"
      highlights={[
        "Development Feasibility & Financial Viability Studies",
        "Highest & Best Use (HBU) Land Analysis",
        "Hospitality, Commercial, Retail & Residential Sector Outlooks",
        "Supply, Demand, Yield & Rental Benchmarking",
        "Bespoke Investor Market Entry Briefings",
        "Port City Colombo & Regional Special Economic Zone Studies",
      ]}
      imageUrl={res.imageUrl}
      imageAlt="Real estate research and market intelligence"
      ctaLabel="REQUEST CUSTOM RESEARCH"
      ctaAction="contact"
    />
  );
}
