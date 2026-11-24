import type { Metadata } from "next";
import { redirect } from "next/navigation";
// Re-enable when Newsroom content is ready:
// import { getSiteContent } from "@/sanity/lib/queries";
// import NewsroomClient from "@/components/NewsroomClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Newsroom",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewsroomPage() {
  // Hidden until Newsroom content is ready; redirect visitors to homepage
  redirect("/");

  // const content = await getSiteContent();
  // return <NewsroomClient content={content} />;
}
