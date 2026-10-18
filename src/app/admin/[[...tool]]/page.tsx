"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { StudioProvider, StudioLayout, useClient, type SanityClient } from "sanity";
import config from "../../../../sanity.config";
import { isSanityConfigured, projectId, dataset } from "@/sanity/env";
import { DEFAULT_SITE_CONTENT } from "@/sanity/lib/defaultData";
import Link from "next/link";

const subscribeNoop = () => () => {};

async function uploadImageAsset(
  client: SanityClient,
  url: string,
  filename: string
) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{ _id }`,
    { filename }
  );

  if (existing?._id) {
    return {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: existing._id },
    };
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch image from ${url}`);
  }
  const blob = await response.blob();
  const uploaded = await client.assets.upload("image", blob, { filename });

  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: uploaded._id },
  };
}

function StudioAdminBar() {
  const client = useClient({ apiVersion: "2025-01-01" });
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleSeed = useCallback(async () => {
    setSeeding(true);
    setSeedMessage("Uploading website images & content to Sanity CMS...");

    try {
      // 1. Upload Navbar Logo, Hero Slides, What We Do 3D 'A', and Team Header BG
      setSeedMessage("Uploading Hero & Brand images (1/5)...");
      const logoImage = await uploadImageAsset(
        client,
        DEFAULT_SITE_CONTENT.settings.logoUrl,
        "sfa-logo.png"
      );

      const heroSlides = [];
      for (let i = 0; i < DEFAULT_SITE_CONTENT.settings.heroImages.length; i++) {
        const slideAsset = await uploadImageAsset(
          client,
          DEFAULT_SITE_CONTENT.settings.heroImages[i],
          `sfa-hero-slide-${i + 1}.jpg`
        );
        heroSlides.push({
          _key: `hero-slide-${i + 1}`,
          ...slideAsset,
        });
      }

      const regionalOffices = [];
      for (let i = 0; i < DEFAULT_SITE_CONTENT.settings.regionalOffices.length; i++) {
        const office = DEFAULT_SITE_CONTENT.settings.regionalOffices[i];
        const flagImage = await uploadImageAsset(
          client,
          office.flagUrl,
          `sfa-flag-${i + 1}.png`
        );
        regionalOffices.push({
          _key: `office-${i + 1}`,
          ...office,
          flagImage,
        });
      }

      const whatWeDoImage = await uploadImageAsset(
        client,
        DEFAULT_SITE_CONTENT.settings.whatWeDoImageUrl,
        "sfa-what-we-do-a.png"
      );

      const teamHeaderImage = await uploadImageAsset(
        client,
        DEFAULT_SITE_CONTENT.settings.teamHeaderImageUrl,
        "sfa-team-header-bg.jpg"
      );

      // 2. Upload Client & Partner Logos
      setSeedMessage("Uploading Client & Partner logos (2/5)...");
      const clientLogos = [];
      for (let i = 0; i < DEFAULT_SITE_CONTENT.settings.clientLogos.length; i++) {
        const cl = DEFAULT_SITE_CONTENT.settings.clientLogos[i];
        const logo = cl.imageUrl
          ? await uploadImageAsset(client, cl.imageUrl, `sfa-client-logo-${i + 1}.png`)
          : undefined;
        clientLogos.push({
          _key: `client-logo-${i + 1}`,
          name: cl.name,
          imageUrl: cl.imageUrl,
          className: cl.className,
          ...(logo ? { logo } : {}),
        });
      }

      const partnerLogos = [];
      for (let i = 0; i < DEFAULT_SITE_CONTENT.settings.partnerLogos.length; i++) {
        const pl = DEFAULT_SITE_CONTENT.settings.partnerLogos[i];
        const logo = pl.imageUrl
          ? await uploadImageAsset(client, pl.imageUrl, `sfa-partner-logo-${i + 1}.png`)
          : undefined;
        partnerLogos.push({
          _key: `partner-logo-${i + 1}`,
          name: pl.name,
          imageUrl: pl.imageUrl,
          className: pl.className,
          ...(logo ? { logo } : {}),
        });
      }

      // 3. Upload Occupier & Research Service Background Images
      setSeedMessage("Uploading Services background images (3/5)...");
      const occupierImage = await uploadImageAsset(
        client,
        DEFAULT_SITE_CONTENT.services.occupier.imageUrl,
        "sfa-occupier-services-bg.jpg"
      );
      const researchImage = await uploadImageAsset(
        client,
        DEFAULT_SITE_CONTENT.services.research.imageUrl,
        "sfa-research-services-bg.jpg"
      );

      // 4. Upload Leadership Team Portraits
      setSeedMessage("Uploading Leadership Team portraits (4/5)...");
      const teamPortraits = [];
      for (let i = 0; i < DEFAULT_SITE_CONTENT.teamMembers.length; i++) {
        const member = DEFAULT_SITE_CONTENT.teamMembers[i];
        const ext = member.image.endsWith(".svg") ? "svg" : "png";
        const portrait = await uploadImageAsset(
          client,
          member.image,
          `sfa-team-member-${i + 1}.${ext}`
        );
        teamPortraits.push({ member, portrait });
      }

      // 5. Commit all documents and images to Sanity
      setSeedMessage("Saving all documents & images to Sanity (5/5)...");
      await client.createIfNotExists({
        _id: "siteSettings",
        _type: "siteSettings",
      });

      await client
        .patch("siteSettings")
        .setIfMissing({
          heroTitleLine1: DEFAULT_SITE_CONTENT.settings.heroTitleLine1,
          heroTitleLine2: DEFAULT_SITE_CONTENT.settings.heroTitleLine2,
          heroSubtitle: DEFAULT_SITE_CONTENT.settings.heroSubtitle,
          heroTagline: DEFAULT_SITE_CONTENT.settings.heroTagline,
          heroDescription: DEFAULT_SITE_CONTENT.settings.heroDescription,
          stats: DEFAULT_SITE_CONTENT.settings.stats.map((stat, idx) => ({
            _key: `stat-${idx + 1}`,
            ...stat,
          })),
          whatWeDoHeadingLine1: DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine1,
          whatWeDoHeadingLine2: DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine2,
          whatWeDoHeadingLine3: DEFAULT_SITE_CONTENT.settings.whatWeDoHeadingLine3,
          whatWeDoSubheading: DEFAULT_SITE_CONTENT.settings.whatWeDoSubheading,
          whatWeDoRightLines: DEFAULT_SITE_CONTENT.settings.whatWeDoRightLines,
          clientsDescription1: DEFAULT_SITE_CONTENT.settings.clientsDescription1,
          clientsDescription2: DEFAULT_SITE_CONTENT.settings.clientsDescription2,
          partnersSubtitle: DEFAULT_SITE_CONTENT.settings.partnersSubtitle,
          partnersDescription: DEFAULT_SITE_CONTENT.settings.partnersDescription,
          teamDescription: DEFAULT_SITE_CONTENT.settings.teamDescription,
          contactTitle: DEFAULT_SITE_CONTENT.settings.contactTitle,
          contactSubtitle: DEFAULT_SITE_CONTENT.settings.contactSubtitle,
          contactDescription: DEFAULT_SITE_CONTENT.settings.contactDescription,
          logoImage,
          heroSlides,
          regionalOffices,
          whatWeDoImage,
          clientLogos,
          partnerLogos,
          teamHeaderImage,
        })
        .commit();

      await client.createOrReplace({
        _id: "serviceSection",
        _type: "serviceSection",
        valuationsTitle: DEFAULT_SITE_CONTENT.services.valuations.title,
        valuationsParagraph1: DEFAULT_SITE_CONTENT.services.valuations.paragraph1,
        valuationsParagraph2: DEFAULT_SITE_CONTENT.services.valuations.paragraph2,
        valuationsCtaText: DEFAULT_SITE_CONTENT.services.valuations.ctaText,
        valuationsCategories: DEFAULT_SITE_CONTENT.services.valuations.categories,
        occupierTitleLine1: DEFAULT_SITE_CONTENT.services.occupier.titleLine1,
        occupierTitleLine2: DEFAULT_SITE_CONTENT.services.occupier.titleLine2,
        occupierLeadParagraph: DEFAULT_SITE_CONTENT.services.occupier.leadParagraph,
        occupierParagraphs: DEFAULT_SITE_CONTENT.services.occupier.paragraphs,
        occupierImage,
        capitalTitleLine1: DEFAULT_SITE_CONTENT.services.capitalMarkets.titleLine1,
        capitalTitleLine2: DEFAULT_SITE_CONTENT.services.capitalMarkets.titleLine2,
        capitalLeftSummary: DEFAULT_SITE_CONTENT.services.capitalMarkets.leftSummary,
        capitalRightHeading1: DEFAULT_SITE_CONTENT.services.capitalMarkets.rightHeading1,
        capitalClientTypes: DEFAULT_SITE_CONTENT.services.capitalMarkets.clientTypes,
        capitalRightBody: DEFAULT_SITE_CONTENT.services.capitalMarkets.rightBody,
        capitalRightHeading2: DEFAULT_SITE_CONTENT.services.capitalMarkets.rightHeading2,
        capitalTransactionLines:
          DEFAULT_SITE_CONTENT.services.capitalMarkets.transactionLines,
        researchTitleLine1: DEFAULT_SITE_CONTENT.services.research.titleLine1,
        researchTitleLine2: DEFAULT_SITE_CONTENT.services.research.titleLine2,
        researchParagraph1: DEFAULT_SITE_CONTENT.services.research.paragraph1,
        researchParagraph2: DEFAULT_SITE_CONTENT.services.research.paragraph2,
        researchImage,
      });

      const transaction = client.transaction();

      for (const report of DEFAULT_SITE_CONTENT.reports) {
        transaction.createOrReplace({
          _id: report._id,
          _type: "report",
          title: report.title,
          category: report.category,
          date: report.date,
          summary: report.summary,
          isFeatured: Boolean(report.isFeatured),
          order: report.order,
        });
      }

      for (const cs of DEFAULT_SITE_CONTENT.caseStudies) {
        transaction.createOrReplace({
          _id: cs._id,
          _type: "caseStudy",
          categoryTag: cs.categoryTag,
          titleLines: cs.titleLines,
          description: cs.description,
          outcomeFootnote: cs.outcomeFootnote,
          order: cs.order,
        });
      }

      for (const { member, portrait } of teamPortraits) {
        transaction.createOrReplace({
          _id: member._id,
          _type: "teamMember",
          name: member.name,
          designation: member.designation,
          credentials: member.credentials,
          portrait,
          fallbackImagePath: member.image,
          order: member.order,
        });
      }

      await transaction.commit();

      setSeedMessage(
        "All website images, logos, team portraits & sections are now uploaded to Sanity CMS!"
      );
    } catch (err) {
      setSeedMessage(
        `Error: ${err instanceof Error ? err.message : "Failed to upload images to Sanity."}`
      );
    } finally {
      setSeeding(false);
    }
  }, [client]);

  return (
    <div className="shrink-0 bg-[#0c2340] text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 z-50">
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
          {seeding ? "Uploading Website Images & Content..." : "Sync Website Images & Content to CMS"}
        </button>
        <Link
          href="/"
          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition"
        >
          View Live Website &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

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
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col bg-[#101112] overflow-hidden z-50">
      {mounted ? (
        <StudioProvider config={config} unstable_globalStyles>
          <StudioAdminBar />
          <div
            id="sanity"
            data-ui="NextStudioLayout"
            className="flex-1 min-h-0 w-full h-full relative overflow-hidden bg-[#101112]"
            style={{ height: "100%", maxHeight: "100%" }}
          >
            <StudioLayout />
          </div>
        </StudioProvider>
      ) : (
        <div className="fixed inset-0 bg-[#0c2340] text-white/70 flex items-center justify-center text-sm font-avenir tracking-wider">
          Loading Sanity Studio...
        </div>
      )}
    </div>
  );
}
