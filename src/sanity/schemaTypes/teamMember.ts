import { defineField, defineType } from "sanity";
import { DeleteTeamMemberField } from "../components/DeleteTeamMemberField";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Leadership Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Credentials (e.g. FIV(SL), FRICS)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Role / Designation (e.g. Founder/Chairman)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait Photo (Upload)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fallbackImagePath",
      title: "Fallback Local Image Path (e.g. /sunil-fernando.png)",
      type: "string",
      initialValue: "/avatar-placeholder.svg",
    }),
    defineField({
      name: "isActive",
      title: "Display on Website",
      description:
        "Toggle OFF to remove / hide this member from the live website without deleting their CMS profile.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order (1 to 6)",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "deleteAction",
      title: "Delete Member",
      type: "string",
      components: {
        input: DeleteTeamMemberField,
      },
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
      title: "name",
      subtitle: "designation",
      media: "portrait",
      isActive: "isActive",
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: title || "Untitled Member",
        subtitle:
          isActive === false
            ? `⛔ [HIDDEN FROM SITE] ${subtitle || ""}`
            : subtitle || "No designation",
        media,
      };
    },
  },
});
