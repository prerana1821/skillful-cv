/* eslint-disable react/display-name */
import { Box, Heading } from "@chakra-ui/react";
import { forwardRef, MutableRefObject } from "react";
import ProfileSummary from "../ResumePreview/ProfileSummary";
import Hobbies from "../ResumePreview/Hobbies";
import Courses from "../ResumePreview/Courses";
import References from "../ResumePreview/References";
import Skills from "../ResumePreview/Skills";
import Languages from "../ResumePreview/Languages";
import Links from "../ResumePreview/Links";
import Internships from "../ResumePreview/Internships";
import ProfessionalExperience from "../ResumePreview/ProfessionalExperience";
import ExtraCurricularActivities from "../ResumePreview/ExtraCurricularActivities";
import CustomSection from "../ResumePreview/CustomSection";
import { titleCaseToDashCase } from "../../utils/caseManipulation";
import { DEFAULT_SECTIONS, TEMPLATE_TYPES } from "../../utils/defaults";
import { useData } from "./DataProvider";
import { Header } from "../ResumePreview/Header";
import Education from "../ResumePreview/Education";

export const getMissingSections = (keys: string[], allSections: string[]) => {
  return keys.filter((key) => !allSections.includes(key));
};

interface PreviewProps {
  sections: { default: string[]; extra: string[] };
  value: any;
  showHeading?: boolean;
  ref?: MutableRefObject<any>;
  styles?: any;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { sections, showHeading, styles, value } = props;

  const { customSectionTitle, template } = useData();

  const keys = Object.keys(value);
  const allSections = Object.values(DEFAULT_SECTIONS).flat();

  const missingSections = getMissingSections(keys, allSections);

  const TemplateComponent =
    TEMPLATE_TYPES[template as keyof typeof TEMPLATE_TYPES]?.component;

  return (
    <Box
      flex={{ base: "none", sm: "45%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
    >
      {showHeading && (
        <Heading as='h3' size='xs' mb='0.5rem'>
          Preview
        </Heading>
      )}
      <Box
        border={"1px solid black"}
        m='0.5rem'
        bgColor={"#fff"}
        color={"#000"}
        borderRadius={"md"}
        p='1rem'
        className='resume-preview'
        ref={ref}
        style={styles}
      >
        {sections.default.map((section: string) => {
          switch (section) {
            case "personal-details":
              const PersonalDetailsComponent =
                TemplateComponent["personal-details"] || Header;
              return (
                value?.["personal-details"] && (
                  <PersonalDetailsComponent
                    data={value?.["personal-details"]}
                  />
                )
              );

            case "profile-summary":
              const ProfileSummaryComponent =
                TemplateComponent["profile-summary"] || ProfileSummary;
              return (
                value?.["profile-summary"] && (
                  <ProfileSummaryComponent data={value?.["profile-summary"]} />
                )
              );
            case "professional-experience":
              const ProfessionalExperienceComponent =
                TemplateComponent["professional-experience"] ||
                ProfessionalExperience;
              return (
                value?.["professional-experience"] && (
                  <ProfessionalExperienceComponent
                    data={value?.["professional-experience"]}
                  />
                )
              );
            case "education":
              const EducationComponent =
                TemplateComponent["education"] || Education;
              return (
                value?.["education"] && (
                  <EducationComponent data={value?.["education"]} />
                )
              );
            case "internships":
              const InternshipsComponent =
                TemplateComponent["internships"] || Internships;
              return (
                value?.["internships"] && (
                  <InternshipsComponent data={value?.["internships"]} />
                )
              );
            case "links":
              const LinksComponent = TemplateComponent["links"] || Links;
              return (
                value?.["links"] && <LinksComponent data={value?.["links"]} />
              );
            case "hobbies":
              const HobbiesComponent = TemplateComponent["hobbies"] || Hobbies;
              return (
                value?.["hobbies"] && (
                  <HobbiesComponent data={value?.["hobbies"]} />
                )
              );
            case "courses":
              const CoursesComponent = TemplateComponent["courses"] || Courses;
              return (
                value?.["courses"] && (
                  <CoursesComponent data={value?.["courses"]} />
                )
              );
            case "extra-curricular-activities":
              const ExtraCurricularActivitiesComponent =
                TemplateComponent["extra-curricular-activities"] ||
                ExtraCurricularActivities;
              return (
                value?.["extra-curricular-activities"] && (
                  <ExtraCurricularActivitiesComponent
                    data={value?.["extra-curricular-activities"]}
                  />
                )
              );
            case "references":
              const ReferencesComponent =
                TemplateComponent["references"] || References;

              return (
                value?.["references"] && (
                  <ReferencesComponent data={value?.["references"]} />
                )
              );
            case "skills":
              const SkillsComponent = TemplateComponent["skills"] || Skills;
              return (
                value?.["skills"] && (
                  <SkillsComponent data={value?.["skills"]} />
                )
              );
            case "languages":
              const LanguagesComponent =
                TemplateComponent["languages"] || Languages;
              return (
                value?.["languages"] && (
                  <LanguagesComponent data={value?.["languages"]} />
                )
              );
            case titleCaseToDashCase(customSectionTitle):
              const CustomSectionComponent =
                TemplateComponent["custom-section"] || CustomSection;
              console.log(CustomSectionComponent);

              if (customSectionTitle) {
                return (
                  value?.[
                    titleCaseToDashCase(customSectionTitle) as string
                  ] && (
                    <CustomSectionComponent
                      data={
                        value?.[
                          titleCaseToDashCase(customSectionTitle) as string
                        ]
                      }
                    />
                  )
                );
              }
              return null;
            default:
              return null;
          }
        })}
        {/* Render CustomSection for keys not in DEFAULT_SECTIONS */}
        {missingSections.map((key: string) => {
          const CustomSectionComponent =
            TemplateComponent["custom-section"] || CustomSection;
          if (sections.default.includes(key) && customSectionTitle !== key) {
            return (
              value?.[titleCaseToDashCase(key) as string] && (
                <CustomSectionComponent
                  data={value?.[titleCaseToDashCase(key) as string]}
                />
              )
            );
          }
          return null;
        })}
      </Box>
    </Box>
  );
});

export default Preview;
