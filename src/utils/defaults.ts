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

import { RiQuillPenFill } from "react-icons/ri";
import { PiSparkleFill } from "react-icons/pi";
import { IoMdColorWand } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { BiSolidBriefcase } from "react-icons/bi";

import { Header } from "../components/ResumePreview/Header";
import Links from "../components/ResumePreview/Links";
import ProfileSummary from "../components/ResumePreview/ProfileSummary";
import Education from "../components/ResumePreview/Education";
import ProfessionalExperience from "../components/ResumePreview/ProfessionalExperience";
import Hobbies from "../components/ResumePreview/Hobbies";
import Courses from "../components/ResumePreview/Courses";
import {
  LondonCourses,
  LondonEducation,
  LondonHeader,
  LondonLinks,
  LondonHobbies,
  LondonProfessionalExperience,
  LondonProfileSummary,
  LondonSkills,
  LondonLanguages,
  LondonInternships,
  LondonExtraCurricularActivities,
  LondonReferences,
} from "../components/ResumePreview/London";
import Skills from "../components/ResumePreview/Skills";
import Languages from "../components/ResumePreview/Languages";
import Internships from "../components/ResumePreview/Internships";
import ExtraCurricularActivities from "../components/ResumePreview/ExtraCurricularActivities";
import References from "../components/ResumePreview/References";

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

export const TEMPLATE_TYPES = {
  london: {
    type: "simple",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
  santiago: {
    type: "simple",
    component: {
      "personal-details": Header,
      links: Links,
      "profile-summary": ProfileSummary,
      education: Education,
      "professional-experience": ProfessionalExperience,
      hobbies: Hobbies,
      courses: Courses,
      skills: Skills,
      languages: Languages,
      internships: Internships,
      "extra-curricular-activities": ExtraCurricularActivities,
      references: References,
    },
  },
  sydney: {
    type: "creative",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
  tokyo: {
    type: "creative",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
  berlin: {
    type: "modern",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
  amsterdam: {
    type: "modern",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
  dublin: {
    type: "professional",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
  stockholm: {
    type: "professional",
    component: {
      "personal-details": LondonHeader,
      links: LondonLinks,
      "profile-summary": LondonProfileSummary,
      education: LondonEducation,
      "professional-experience": LondonProfessionalExperience,
      hobbies: LondonHobbies,
      courses: LondonCourses,
      skills: LondonSkills,
      languages: LondonLanguages,
      internships: LondonInternships,
      "extra-curricular-activities": LondonExtraCurricularActivities,
      references: LondonReferences,
    },
  },
};
