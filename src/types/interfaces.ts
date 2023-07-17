// export type AllSectionsI =
//   | {
//       "personal-details"?: PersonalDetailsI;
//     }
//   | ProfileSummaryI
//   | ProfessionalExperienceI
//   | ProfessionalExperienceI
//   | ExtraCurricularActivitiesI
//   | EducationI
//   | CoursesI
//   | InternshipsI
//   | LinksI
//   | SectionWithListTextI
//   | SkillsI
//   | LanguagesI
//   | ReferencesI
//   | CustomSectionI;

// // export interface AllSectionsI {
// //   "personal-details"?: PersonalDetailsI;
// //   "profile-summary"?: ProfileSummaryI;
// //   "professional-experience"?: ProfessionalExperienceI;
// //   "extra-curricular-activities"?: ExtraCurricularActivitiesI;
// //   education?: EducationI;
// //   courses?: CoursesI;
// //   internships?: InternshipsI;
// //   links?: LinksI;
// //   hobbies?: SectionWithListTextI;
// //   skills?: SkillsI;
// //   languages?: LanguagesI;
// //   references?: ReferencesI;
// // }

export interface PersonalDetailsI {
  "first-name"?: string;
  "last-name"?: string;
  "job-title"?: string;
  "phone-number"?: string;
  email?: string;
  country?: string;
  city?: string;
}

export interface ProfileSummaryI {
  "profile-summary": TitleDescI;
}

export interface TitleDescI {
  title?: string;
  description?: string;
}

export interface CustomSectionI {
  [key: string]: SectionWithListI;
}

export interface CoursesI {
  courses: SectionWithListI;
}
export interface ProfessionalExperienceI {
  "professional-experience": SectionWithListI;
}
export interface InternshipsI {
  internships: SectionWithListI;
}

export interface EducationI {
  education: SectionWithListI;
}
export interface ReferencesI {
  references: SectionWithListI;
}
export interface ExtraCurricularActivitiesI {
  "extra-curricular-activities": SectionWithListI;
}

export interface SectionWithListI {
  title?: string;
  list?: ListI[];
}

export interface SectionWithListTextI {
  title?: string;
  list?: string[];
}

export interface ListI {
  institution?: string;
  degree?: string;
  city?: string;
  course?: string;
  employer?: string;
  title?: string;
  description?: string;
  email?: string;
  company?: string;
  "referent's-full-name"?: string;
  "phone-number"?: string;
  "activity-name"?: string;
  "start-date"?: string;
  "end-date"?: string;
  "certificate-link"?: string;
  descriptionList?: string[];
}

export interface LanguagesI {
  languages: TitleListI;
}
export interface LinksI {
  links: TitleListI;
}
export interface SkillsI {
  skills: TitleListI;
}

export interface TitleListI {
  title: string;
  list?: TextListI[];
}

export interface TextListI {
  name?: string;
  level?: string;
  label?: string;
  link?: string;
}

// *********************************
// Common Interfaces

export interface DateRange {
  "start-date"?: string;
  "end-date"?: string;
}

// export interface ListItemI {
//   title?: string;
//   descriptionList?: string[];
// }

export interface TextLink {
  label?: string;
  link?: string;
}

// Section Interfaces

export interface PersonalDetails {
  "first-name"?: string;
  "last-name"?: string;
  "job-title"?: string;
  "phone-number"?: string;
  email?: string;
  country?: string;
  city?: string;
}

export interface ProfileSummary {
  title?: string;
  description?: string;
}

export interface Education extends ListItemI {
  institution?: string;
  degree?: string;
  city?: string;
}

// export interface Course extends ListItemI, DateRange {
//   institution?: string;
//   course?: string;
//   "certificate-link"?: string;
// }

export interface ProfessionalExperience extends ListItemI, DateRange {
  employer?: string;
  city?: string;
}

export interface Internship extends ProfessionalExperience {}

export interface ExtraCurricularActivity extends ListItemI, DateRange {
  employer?: string;
  city?: string;
}

export interface Link extends TextLink {}

export interface Skill {
  name?: string;
  level?: string;
}

export interface Language {
  name?: string;
  level?: string;
}

export interface Reference {
  "referent's-full-name"?: string;
  company?: string;
  "phone-number"?: string;
  email?: string;
}

export interface CustomSectionItem {
  title?: string;
  list?: ListItemI[];
}

// Value Object Interface

// export interface ValueI {
//   "personal-details"?: PersonalDetails;
//   'profile-summary'?: ProfileSummary;
//   education?: Education[];
//   courses?: Course[];
//   "professional-experience"?: ProfessionalExperience[];
//   internships?: Internship[];
//   links?: Link[];
//   skills?: Skill[];
//   hobbies?: string[];
//   languages?: Language[];
//   references?: Reference[];
//   "extra-curricular-activities"?: ExtraCurricularActivity[];
//   [key: string]:
//     | CustomSectionItem
//     | undefined
//     | PersonalDetails
//     | ProfileSummary
//     | Education[]
//     | Course[]
//     | ProfessionalExperience[]
//     | Internship[]
//     | Link[]
//     | Skill[]
//     | string[]
//     | Language[]
//     | Reference[]
//     | ExtraCurricularActivity[]
//     | undefined;
// }

export interface ListItemI {
  title?: string;
  description?: string;
  descriptionList?: string[];
}

export interface Course extends ListItemI, DateRange {
  institution?: string;
  course?: string;
  "certificate-link"?: string;
}

export interface ValueI {
  "personal-details"?: PersonalDetails;
  "profile-summary"?: ProfileSummary;
  education?: CustomSectionItem[];
  courses?: Course[];
  "professional-experience"?: ProfessionalExperience[];
  internships?: Internship[];
  links?: Link[];
  skills?: Skill[];
  hobbies?: string[];
  languages?: Language[];
  references?: Reference[];
  "extra-curricular-activities"?: ExtraCurricularActivity[];
  [key: string]:
    | CustomSectionItem
    | undefined
    | PersonalDetails
    | ProfileSummary
    | Education[]
    | Course[]
    | ProfessionalExperience[]
    | Internship[]
    | Link[]
    | Skill[]
    | string[]
    | Language[]
    | Reference[]
    | ExtraCurricularActivity[]
    | undefined;
}
