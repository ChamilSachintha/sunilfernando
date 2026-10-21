import { type SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { serviceSectionType } from "./serviceSection";
import { networkSectionType } from "./networkSection";
import { reportType } from "./report";
import { caseStudyType } from "./caseStudy";
import { teamMemberType } from "./teamMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    serviceSectionType,
    networkSectionType,
    reportType,
    caseStudyType,
    teamMemberType,
  ],
};
