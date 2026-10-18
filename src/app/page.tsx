import { getSiteContent } from "@/sanity/lib/queries";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const initialContent = await getSiteContent();
  return <HomeClient initialContent={initialContent} />;
}
