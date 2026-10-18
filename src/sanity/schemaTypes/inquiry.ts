import { defineField, defineType } from "sanity";

export const inquiryType = defineType({
  name: "inquiry",
  title: "Form Inquiry (Valuation & Contact)",
  type: "document",
  fields: [
    defineField({
      name: "inquiryType",
      title: "Form Type",
      type: "string",
      options: {
        list: [
          { title: "Valuation Request", value: "valuation" },
          { title: "General Contact", value: "contact" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Review", value: "in_review" },
          { title: "Responded", value: "responded" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company / Organization",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject (Contact Form)",
      type: "string",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type (Valuation Request)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Property Location (Valuation Request)",
      type: "string",
    }),
    defineField({
      name: "purpose",
      title: "Valuation Purpose",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message / Notes",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      inquiryType: "inquiryType",
      email: "email",
      status: "status",
    },
    prepare({ name, inquiryType, email, status }) {
      const badge = inquiryType === "valuation" ? "📋 Valuation" : "✉️ Contact";
      return {
        title: `${name || "Anonymous"} (${badge})`,
        subtitle: `${email || ""} • Status: ${(status || "new").toUpperCase()}`,
      };
    },
  },
});
