import { defineArrayMember, defineField } from "sanity";

/**
 * Rich-text "Full Article" field shared by reports and case studies.
 * Rendered in full on the /newsroom page.
 */
export const articleBodyField = (description: string) =>
  defineField({
    name: "body",
    title: "Full Article (Shown on Newsroom Page)",
    description,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Paragraph", value: "normal" },
          { title: "Heading", value: "h2" },
          { title: "Sub-heading", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet list", value: "bullet" },
          { title: "Numbered list", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
                  validation: (rule) =>
                    rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                }),
              ],
            },
          ],
        },
      }),
    ],
  });
