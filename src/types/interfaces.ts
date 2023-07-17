export interface AllSectionsI {
  "personal-details"?: PersonalDetailsI;
  "profile-summary"?: ProfileSummaryI;
  "professional-experience"?: ProfessionalExperienceI;
  "extra-curricular-activities"?: ExtraCurricularActivitiesI;
  education?: EducationI;
  courses?: CoursesI;
  internships?: InternshipsI;
  links?: LinksI;
  hobbies?: SectionWithListTextI;
  skills?: SkillsI;
  languages?: LanguagesI;
  references?: ReferencesI;
}

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
