import { type SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { serviceSectionType } from "./serviceSection";
import { reportType } from "./report";
import { caseStudyType } from "./caseStudy";
import { teamMemberType } from "./teamMember";
import { inquiryType } from "./inquiry";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    serviceSectionType,
    reportType,
    caseStudyType,
    teamMemberType,
    inquiryType,
  ],
};
