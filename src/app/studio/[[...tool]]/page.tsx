"use client";

import { useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured, projectId, dataset } from "@/sanity/env";
import Link from "next/link";

export default function StudioPage() {
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch("/api/sanity-seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSeedMessage(`Success: ${data.message}`);
      } else {
        setSeedMessage(`Error: ${data.error || "Failed to seed Sanity dataset."}`);
      }
    } catch {
      setSeedMessage("Error: Could not reach /api/sanity-seed.");
    } finally {
      setSeeding(false);
    }
  };

  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen bg-[#0c2340] text-white font-avenir flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="max-w-3xl w-full bg-[#133253] border border-white/15 rounded-2xl shadow-2xl p-8 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
            <div>
              <span className="text-xs font-montserrat font-bold tracking-[0.25em] text-[#00bdf1] uppercase">
                SUNIL FERNANDO &amp; ASSOCIATES
              </span>
              <h1 className="text-2xl sm:text-3xl font-montserrat font-normal tracking-wide uppercase mt-1">
                Sanity CMS Studio Setup
              </h1>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-xs font-montserrat font-medium tracking-widest uppercase bg-white/10 hover:bg-white/20 rounded-lg transition w-fit"
            >
              &larr; Back to Website
            </Link>
          </div>

          <div className="space-y-4 text-sm text-white/90 leading-relaxed">
            <p>
              Sanity CMS schemas, GROQ queries, form inquiry handlers, and Studio desk structure are installed and ready. To activate the live Sanity Studio interface at <code className="px-1.5 py-0.5 bg-black/30 rounded text-[#00bdf1]">/studio</code>, connect your Sanity Project ID:
            </p>

            <div className="bg-[#09192e] border border-white/10 rounded-xl p-5 space-y-3">
              <h2 className="text-xs font-montserrat font-semibold tracking-widest text-[#00bdf1] uppercase">
                Step 1 — Create or Get Your Sanity Project ID
              </h2>
              <p className="text-xs text-white/80">
                Run the command below in your terminal or create a free project at{" "}
                <a
                  href="https://www.sanity.io/manage"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00bdf1] underline"
                >
                  sanity.io/manage
                </a>
                :
              </p>
              <pre className="text-xs bg-black/50 p-3 rounded-lg overflow-x-auto text-emerald-300">
                npx sanity@latest init --env .env.local
              </pre>
            </div>

            <div className="bg-[#09192e] border border-white/10 rounded-xl p-5 space-y-3">
              <h2 className="text-xs font-montserrat font-semibold tracking-widest text-[#00bdf1] uppercase">
                Step 2 — Add Environment Variables to .env.local
              </h2>
              <pre className="text-xs bg-black/50 p-3 rounded-lg overflow-x-auto text-sky-200 leading-relaxed">
{`NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"

# Optional: Needed for 1-click content seeding & saving Valuation/Contact forms to Sanity
SANITY_API_WRITE_TOKEN="your_sanity_editor_or_write_token"`}
              </pre>
            </div>

            <div className="bg-[#09192e] border border-white/10 rounded-xl p-5 space-y-3">
              <h2 className="text-xs font-montserrat font-semibold tracking-widest text-[#00bdf1] uppercase">
                Configured Content Collections Ready in This CMS
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85">
                <li>• <strong>1. Site &amp; Hero Settings</strong> (Hero, Offices, Figures)</li>
                <li>• <strong>2. Explore Our Services</strong> (4 Service Tabs)</li>
                <li>• <strong>3. Newsroom Reports</strong> (PDFs &amp; Market Commentary)</li>
                <li>• <strong>4. Case Studies</strong> (Portfolio &amp; Advisory Highlights)</li>
                <li>• <strong>5. Leadership Team</strong> (6 Director Profiles &amp; Photos)</li>
                <li>• <strong>6. Form Inquiries</strong> (Valuation &amp; Contact Inbox)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Admin Utility Bar for 1-Click Initial Content Seeding */}
      <div className="bg-[#0c2340] text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 z-50">
        <div className="flex items-center gap-3">
          <span className="font-montserrat font-semibold tracking-wider uppercase text-[#00bdf1]">
            SFA Sanity CMS
          </span>
          <span className="text-white/60">
            Project: <code className="text-white/90">{projectId}</code> ({dataset})
          </span>
        </div>
        <div className="flex items-center gap-3">
          {seedMessage && (
            <span className="text-emerald-300 font-medium">{seedMessage}</span>
          )}
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="cursor-pointer px-3 py-1 bg-[#2684be] hover:bg-[#1e6b9b] disabled:opacity-50 text-white rounded font-medium transition"
          >
            {seeding ? "Seeding Website Content..." : "Seed Default Website Content"}
          </button>
          <Link
            href="/"
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition"
          >
            View Live Website &rarr;
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <NextStudio config={config} />
      </div>
    </div>
  );
}
