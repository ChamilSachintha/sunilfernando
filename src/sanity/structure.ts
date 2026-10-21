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
      S.listItem()
        .title("3. Network (Clients & Partners)")
        .id("networkSection")
        .child(
          S.document()
            .schemaType("networkSection")
            .documentId("networkSection")
            .title("Network")
        ),
      S.divider(),
      S.documentTypeListItem("report").title("4. Newsroom Reports & Commentary"),
      S.documentTypeListItem("caseStudy").title("5. Case Studies"),
      S.documentTypeListItem("teamMember").title("6. Leadership Team Profiles"),
    ]);
