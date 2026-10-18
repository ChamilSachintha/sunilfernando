"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { DeleteTeamMemberAction } from "./src/sanity/actions/deleteTeamMember";

export default defineConfig({
  basePath: "/studio",
  name: "sunil_fernando_cms",
  title: "Sunil Fernando & Associates — CMS",
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "teamMember") {
        return [...prev, DeleteTeamMemberAction];
      }
      return prev;
    },
  },
});
