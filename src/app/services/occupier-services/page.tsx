import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import ServicePageClient from "@/components/ServicePageClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Occupier Services",
  description:
    "Strategic tenant representation, lease advisory, rent reviews, workplace strategy, and corporate real estate solutions across Sri Lanka, the Maldives, and the UAE.",
  alternates: {
    canonical: "/services/occupier-services",
  },
  openGraph: {
    title: "Occupier Services | Sunil Fernando & Associates",
    description:
      "End-to-end corporate occupier advisory, lease restructuring, and portfolio optimization across Sri Lanka, the Maldives, and the UAE.",
    url: "/services/occupier-services",
  },
};

export default async function OccupierServicesPage() {
  const content = await getSiteContent();
  const occ = content.services.occupier;

  return (
    <ServicePageClient
      slug="occupier-services"
      content={content}
      eyebrow="CORE SERVICE • CORPORATE REAL ESTATE"
      titleLine1={occ.titleLine1}
      titleLine2={occ.titleLine2}
      lead={occ.leadParagraph}
      paragraphs={occ.paragraphs}
      highlightsHeading="OCCUPIER ADVISORY CAPABILITIES"
      highlights={[
        "Tenant Representation & Site Acquisition",
        "Lease Restructuring, Renewals & Rent Reviews",
        "Corporate Portfolio Optimization & Footprint Strategy",
        "Occupancy Cost Benchmarking & Financial Modelling",
        "Commercial Office, Retail & Industrial Space Advisory",
        "Cross-Border Market Entry Support (Sri Lanka, UAE & Maldives)",
      ]}
      imageUrl={occ.imageUrl}
      imageAlt="Modern corporate workspace and occupier advisory"
      ctaLabel="SPEAK WITH AN OCCUPIER ADVISOR"
      ctaAction="contact"
    />
  );
}
