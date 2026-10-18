import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site & Hero Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero & Offices", default: true },
    { name: "stats", title: "Figures / Stats" },
    { name: "whatWeDo", title: "What We Do" },
    { name: "sections", title: "Clients, Partners, Team & Contact" },
  ],
  fields: [
    defineField({
      name: "heroTitleLine1",
      title: "Hero Title Line 1",
      type: "string",
      group: "hero",
      initialValue: "TRUSTED",
    }),
    defineField({
      name: "heroTitleLine2",
      title: "Hero Title Line 2",
      type: "string",
      group: "hero",
      initialValue: "VALUATIONS",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      group: "hero",
      initialValue: "INFORMED DECISIONS",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      group: "hero",
      initialValue: "SINCE 1999",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Carousel Images",
      type: "array",
      group: "hero",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "regionalOffices",
      title: "Regional Offices (Hero Bar)",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "country", title: "Country / City Heading", type: "string" }),
            defineField({ name: "flagUrl", title: "Flag Image Path", type: "string" }),
            defineField({ name: "address", title: "Office Address", type: "string" }),
            defineField({ name: "phoneDisplay", title: "Phone Display Text", type: "string" }),
            defineField({ name: "phoneHref", title: "Phone Dial Number", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Four-Quadrant Figures (26+, IVSL, RARE, RICS)",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Main Value (e.g. 26+, IVSL)", type: "string" }),
            defineField({ name: "subtitleLine1", title: "Subtitle Line 1 (Optional)", type: "string" }),
            defineField({ name: "subtitleLine2", title: "Subtitle Line 2 (Optional)", type: "string" }),
            defineField({
              name: "accentColor",
              title: "Color Theme",
              type: "string",
              options: {
                list: [
                  { title: "SFA Blue (#2684be)", value: "blue" },
                  { title: "SFA Navy (#0c2340)", value: "navy" },
                ],
              },
              initialValue: "navy",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "whatWeDoHeadingLine1",
      title: "What We Do Heading Line 1",
      type: "string",
      group: "whatWeDo",
      initialValue: "END-TO-END",
    }),
    defineField({
      name: "whatWeDoHeadingLine2",
      title: "What We Do Heading Line 2",
      type: "string",
      group: "whatWeDo",
      initialValue: "REAL ESTATE",
    }),
    defineField({
      name: "whatWeDoHeadingLine3",
      title: "What We Do Heading Line 3",
      type: "string",
      group: "whatWeDo",
      initialValue: "ADVISORY",
    }),
    defineField({
      name: "whatWeDoSubheading",
      title: "What We Do Subheading",
      type: "string",
      group: "whatWeDo",
      initialValue: "BUILT FOR INSTITUTIONS",
    }),
    defineField({
      name: "whatWeDoRightLines",
      title: "What We Do Right Column Lines",
      type: "array",
      group: "whatWeDo",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "clientsDescription1",
      title: "Our Clients - Paragraph 1",
      type: "text",
      rows: 2,
      group: "sections",
    }),
    defineField({
      name: "clientsDescription2",
      title: "Our Clients - Paragraph 2",
      type: "text",
      rows: 3,
      group: "sections",
    }),
    defineField({
      name: "partnersSubtitle",
      title: "Our Partners - Subtitle",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "partnersDescription",
      title: "Our Partners - Description",
      type: "text",
      rows: 3,
      group: "sections",
    }),
    defineField({
      name: "teamDescription",
      title: "Our Leadership Team - Description",
      type: "text",
      rows: 3,
      group: "sections",
    }),
    defineField({
      name: "contactTitle",
      title: "Contact Banner - Title",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactSubtitle",
      title: "Contact Banner - Subtitle",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "contactDescription",
      title: "Contact Banner - Description",
      type: "text",
      rows: 2,
      group: "sections",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site & Hero Settings",
        subtitle: "Global website configuration, Hero, Figures & Section copy",
      };
    },
  },
});
