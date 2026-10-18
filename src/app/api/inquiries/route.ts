import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = getSanityWriteClient();

    if (!client) {
      // Gracefully succeed even if SANITY_API_WRITE_TOKEN is not yet configured
      return NextResponse.json({
        ok: true,
        storedInSanity: false,
      });
    }

    const doc = await client.create({
      _type: "inquiry",
      inquiryType: body.inquiryType === "valuation" ? "valuation" : "contact",
      status: "new",
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      company: body.company || "",
      subject: body.subject || "",
      propertyType: body.propertyType || "",
      location: body.location || "",
      purpose: body.purpose || "",
      message: body.message || "",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      storedInSanity: true,
      id: doc._id,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to save inquiry",
      },
      { status: 500 }
    );
  }
}
