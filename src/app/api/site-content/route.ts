import { NextResponse } from "next/server";
import { getSiteContent } from "@/sanity/lib/queries";

export const dynamic = "force-static";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}
