import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/queries";
import NewsroomClient from "@/components/NewsroomClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Market insights, research reports and case studies from Sunil Fernando & Associates — independent real estate valuation and advisory across Sri Lanka, the Maldives and the UAE.",
  alternates: {
    canonical: "/newsroom",
  },
  openGraph: {
    title: "Newsroom | Sunil Fernando & Associates",
    description:
      "Market insights, research reports and case studies from Sunil Fernando & Associates.",
    url: "/newsroom",
  },
};

export default async function NewsroomPage() {
  const content = await getSiteContent();
  return <NewsroomClient content={content} />;
}
