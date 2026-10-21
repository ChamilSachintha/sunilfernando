import { defineField, defineType } from "sanity";
import { articleBodyField } from "./articleBody";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "categoryTag",
      title: "Sector & Type Tag (e.g. FINANCIAL INSTITUTION · PORTFOLIO VALUATION)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleLines",
      title: "Heading Lines (Each entry renders on its own line)",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Case Study Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    articleBodyField(
      "The complete case study (background, approach, results). If left empty, the description is shown instead."
    ),
    defineField({
      name: "outcomeFootnote",
      title: "Outcome Footnote (Bottom Highlight Line)",
      type: "string",
      validation: (rule) => rule.required(),
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
      titleLines: "titleLines",
      subtitle: "categoryTag",
    },
    prepare({ titleLines, subtitle }) {
      return {
        title: Array.isArray(titleLines) ? titleLines.join(" ") : "Case Study",
        subtitle,
      };
    },
  },
});
