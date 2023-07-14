import profile_summary from "@/data/profile-summary.json";
import education from "@/data/education.json";
import professional_experience from "@/data/professional-experience.json";
import personal_details from "@/data/default-resume.json";
import courses from "@/data/courses.json";
import extra_curricular_activities from "@/data/extra-curricular-activities.json";
import hobbies from "@/data/hobbies.json";
import internships from "@/data/internships.json";
import languages from "@/data/languages.json";
import links from "@/data/links.json";
import references from "@/data/references.json";
import skills from "@/data/skills.json";

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

export const DEFAULT_SECTIONS_JSON = {
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
