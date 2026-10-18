import { defineField, defineType } from "sanity";

export const serviceSectionType = defineType({
  name: "serviceSection",
  title: "Services Tabs",
  type: "document",
  groups: [
    { name: "valuations", title: "1. Valuations", default: true },
    { name: "occupier", title: "2. Occupier Services" },
    { name: "capitalMarkets", title: "3. Capital Markets" },
    { name: "research", title: "4. Research Services" },
  ],
  fields: [
    // 1. Valuations
    defineField({
      name: "valuationsTitle",
      title: "Valuations Title",
      type: "string",
      group: "valuations",
      initialValue: "VALUATIONS",
    }),
    defineField({
      name: "valuationsParagraph1",
      title: "Valuations Paragraph 1",
      type: "text",
      rows: 3,
      group: "valuations",
    }),
    defineField({
      name: "valuationsParagraph2",
      title: "Valuations Paragraph 2",
      type: "text",
      rows: 3,
      group: "valuations",
    }),
    defineField({
      name: "valuationsCtaText",
      title: "Valuations CTA Button Text",
      type: "string",
      group: "valuations",
      initialValue: "EXPLORE VALUATION SERVICES",
    }),
    defineField({
      name: "valuationsCategories",
      title: "Valuations Right-Side Categories",
      type: "array",
      group: "valuations",
      of: [{ type: "string" }],
    }),

    // 2. Occupier Services
    defineField({
      name: "occupierTitleLine1",
      title: "Occupier Title Line 1",
      type: "string",
      group: "occupier",
      initialValue: "OCCUPIER",
    }),
    defineField({
      name: "occupierTitleLine2",
      title: "Occupier Title Line 2",
      type: "string",
      group: "occupier",
      initialValue: "SERVICES",
    }),
    defineField({
      name: "occupierLeadParagraph",
      title: "Occupier Lead Bold Paragraph",
      type: "text",
      rows: 2,
      group: "occupier",
    }),
    defineField({
      name: "occupierParagraphs",
      title: "Occupier Body Paragraphs",
      type: "array",
      group: "occupier",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "occupierImage",
      title: "Occupier Background Image",
      type: "image",
      options: { hotspot: true },
      group: "occupier",
    }),

    // 3. Capital Markets
    defineField({
      name: "capitalTitleLine1",
      title: "Capital Markets Title Line 1",
      type: "string",
      group: "capitalMarkets",
      initialValue: "CAPITAL",
    }),
    defineField({
      name: "capitalTitleLine2",
      title: "Capital Markets Title Line 2",
      type: "string",
      group: "capitalMarkets",
      initialValue: "MARKETS",
    }),
    defineField({
      name: "capitalLeftSummary",
      title: "Capital Markets Left Summary",
      type: "text",
      rows: 3,
      group: "capitalMarkets",
    }),
    defineField({
      name: "capitalRightHeading1",
      title: "Capital Markets Right Heading 1",
      type: "string",
      group: "capitalMarkets",
    }),
    defineField({
      name: "capitalClientTypes",
      title: "Capital Markets Client Types List",
      type: "array",
      group: "capitalMarkets",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "capitalRightBody",
      title: "Capital Markets Right Body Paragraph",
      type: "text",
      rows: 3,
      group: "capitalMarkets",
    }),
    defineField({
      name: "capitalRightHeading2",
      title: "Capital Markets Right Heading 2",
      type: "string",
      group: "capitalMarkets",
    }),
    defineField({
      name: "capitalTransactionLines",
      title: "Capital Markets Strategic Transactions Lines",
      type: "array",
      group: "capitalMarkets",
      of: [{ type: "string" }],
    }),

    // 4. Research Services
    defineField({
      name: "researchTitleLine1",
      title: "Research Title Line 1",
      type: "string",
      group: "research",
      initialValue: "RESEARCH",
    }),
    defineField({
      name: "researchTitleLine2",
      title: "Research Title Line 2",
      type: "string",
      group: "research",
      initialValue: "SERVICES",
    }),
    defineField({
      name: "researchParagraph1",
      title: "Research Paragraph 1",
      type: "text",
      rows: 3,
      group: "research",
    }),
    defineField({
      name: "researchParagraph2",
      title: "Research Paragraph 2",
      type: "text",
      rows: 3,
      group: "research",
    }),
    defineField({
      name: "researchImage",
      title: "Research Background Image",
      type: "image",
      options: { hotspot: true },
      group: "research",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Explore Our Services (4 Tabs)",
        subtitle: "Valuations, Occupier Services, Capital Markets & Research Services",
      };
    },
  },
});
