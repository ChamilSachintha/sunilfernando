import { defineField, defineType } from "sanity";

export const reportType = defineType({
  name: "report",
  title: "Newsroom Report / Commentary",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Report / Commentary Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category Tag (e.g. MARKET COMMENTARY, MALDIVES)",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Publication Date Label (e.g. APRIL 2026)",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary Description (Shown on Featured Report)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Report (Shows Download Button)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "pdfFile",
      title: "Report PDF File",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "externalUrl",
      title: "External Report Link (Optional fallback if no PDF uploaded)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "date",
      isFeatured: "isFeatured",
    },
    prepare({ title, subtitle, date, isFeatured }) {
      return {
        title,
        subtitle: isFeatured
          ? "★ Featured Report (Downloadable)"
          : [subtitle, date].filter(Boolean).join(" • "),
      };
    },
  },
});
