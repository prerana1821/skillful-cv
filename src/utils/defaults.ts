import profile_summary from "../data/profile-summary.json";
import education from "../data/education.json";
import professional_experience from "../data/professional-experience.json";
import personal_details from "../data/default-resume.json";
import courses from "../data/courses.json";
import extra_curricular_activities from "../data/extra-curricular-activities.json";
import hobbies from "../data/hobbies.json";
import internships from "../data/internships.json";
import languages from "../data/languages.json";
import links from "../data/links.json";
import references from "../data/references.json";
import skills from "../data/skills.json";

import { HiLightBulb } from "react-icons/hi";
import { RiQuillPenFill } from "react-icons/ri";
import { PiSparkleFill } from "react-icons/pi";
import { IoMdColorWand } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { BiSolidBriefcase } from "react-icons/bi";

export const DEFAULT_SECTIONS = {
  default: ["personal-details"],
  extra: [
    "profile-summary",
    "education",
    "professional-experience",
    "courses",
    "internships",
    "links",
    "skills",
    "hobbies",
    "languages",
    "references",
    "extra-curricular-activities",
  ],
};

export const AI_SUGGESTIONS_OPTIONS = [
  {
    value: "keyword-suggestions",
    label: "Keyword suggestions",
    icon: IoMdColorWand,
  },
  {
    value: "continue-writing",
    label: "Continue writing ...",
    icon: RiQuillPenFill,
  },
  {
    value: "change-tone",
    label: "Change tone to formal",
    icon: BiSolidBriefcase,
  },
  { value: "rephrase", label: "Rephrase", icon: FaPencilAlt },
  {
    value: "content-generation",
    label: "Content generation",
    icon: HiLightBulb,
  },
  {
    value: "language-enhancement",
    label: "Language enhancement",
    icon: PiSparkleFill,
  },
];

export const DEFAULT_SECTIONS_JSON: { [key: string]: any } = {
  personal_details,
  profile_summary,
  education,
  professional_experience,
  courses,
  extra_curricular_activities,
  hobbies,
  internships,
  languages,
  links,
  references,
  skills,
};
