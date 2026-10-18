import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Sunil Fernando & Associates CMS")
    .items([
      S.listItem()
        .title("1. Site & Hero Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site & Hero Settings")
        ),
      S.listItem()
        .title("2. Explore Our Services (4 Tabs)")
        .id("serviceSection")
        .child(
          S.document()
            .schemaType("serviceSection")
            .documentId("serviceSection")
            .title("Explore Our Services (4 Tabs)")
        ),
      S.divider(),
      S.documentTypeListItem("report").title("3. Newsroom Reports & Commentary"),
      S.documentTypeListItem("caseStudy").title("4. Case Studies"),
      S.documentTypeListItem("teamMember").title("5. Leadership Team Profiles"),
      S.divider(),
      S.documentTypeListItem("inquiry").title("6. Form Inquiries (Valuation & Contact)"),
    ]);
