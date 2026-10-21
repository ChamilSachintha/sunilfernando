import { defineField, defineType } from "sanity";

export const networkSectionType = defineType({
  name: "networkSection",
  title: "Network (Clients & Partners)",
  type: "document",
  groups: [
    { name: "clients", title: "1. Client Logos", default: true },
    { name: "partners", title: "2. Partner Logos (Two Parts)" },
  ],
  fields: [
    // --- Clients Group ---
    defineField({
      name: "clientsDescription1",
      title: "Our Clients - Paragraph 1",
      type: "text",
      rows: 2,
      group: "clients",
    }),
    defineField({
      name: "clientsDescription2",
      title: "Our Clients - Paragraph 2",
      type: "text",
      rows: 3,
      group: "clients",
    }),
    defineField({
      name: "clientLogos",
      title: "Our Clients - Logos",
      description: "Logos of corporate & institutional clients",
      type: "array",
      group: "clients",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Client Name", type: "string" }),
            defineField({
              name: "logo",
              title: "Client Logo Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "imageUrl", title: "Fallback Logo Path", type: "string" }),
            defineField({ name: "className", title: "Height CSS Classes", type: "string" }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        },
      ],
    }),

    // --- Partners Group ---
    defineField({
      name: "partnersSubtitle",
      title: "Our Partners - Subtitle",
      type: "string",
      group: "partners",
    }),
    defineField({
      name: "partnersDescription",
      title: "Our Partners - Description",
      type: "text",
      rows: 3,
      group: "partners",
    }),
    defineField({
      name: "partnerLogosPart1",
      title: "Partner Logos - First Part",
      description: "First part of the partner network logos (e.g. KPMG, Knight Frank, Kreston, BDO, Makeelu Chambers, Baker Tilly)",
      type: "array",
      group: "partners",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Partner Name", type: "string" }),
            defineField({
              name: "logo",
              title: "Partner Logo Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "imageUrl", title: "Fallback Logo Path", type: "string" }),
            defineField({ name: "className", title: "Height CSS Classes", type: "string" }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        },
      ],
    }),
    defineField({
      name: "partnerLogosPart2",
      title: "Partner Logos - Second Part",
      description: "Second part of the partner network logos (e.g. Warren Vicks, Design Advocacy, Acquest, NDB, Coenergi, Sudath Perera)",
      type: "array",
      group: "partners",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Partner Name", type: "string" }),
            defineField({
              name: "logo",
              title: "Partner Logo Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "imageUrl", title: "Fallback Logo Path", type: "string" }),
            defineField({ name: "className", title: "Height CSS Classes", type: "string" }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        },
      ],
    }),
    defineField({
      name: "partnerLogos",
      title: "All Partner Logos (Legacy Combined Fallback)",
      description: "Optional fallback if Part 1 and Part 2 are empty",
      type: "array",
      group: "partners",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Partner Name", type: "string" }),
            defineField({
              name: "logo",
              title: "Partner Logo Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "imageUrl", title: "Fallback Logo Path", type: "string" }),
            defineField({ name: "className", title: "Height CSS Classes", type: "string" }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Network (Clients & Partners)",
        subtitle: "Client logos & two-part partner logos",
      };
    },
  },
});
