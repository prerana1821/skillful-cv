/* eslint-disable react/display-name */
import { Box, Heading } from "@chakra-ui/react";
import Header from "../ResumePreview/Header";
import { forwardRef, MutableRefObject } from "react";
import ProfileSummary from "../ResumePreview/ProfileSummary";
import Hobbies from "../ResumePreview/Hobbies";
import Courses from "../ResumePreview/Courses";
import References from "../ResumePreview/References";
import Skills from "../ResumePreview/Skills";
import Languages from "../ResumePreview/Languages";
import Links from "../ResumePreview/Links";
import Education from "../ResumePreview/Education";
import Internships from "../ResumePreview/Internships";
import ProfessionalExperience from "../ResumePreview/ProfessionalExperience";
import ExtraCurricularActivities from "../ResumePreview/ExtraCurricularActivities";
import CustomSection from "../ResumePreview/CustomSection";
import { titleCaseToDashCase } from "../../utils/caseManipulation";
import { DEFAULT_SECTIONS } from "../../utils/defaults";
import { useData } from "./DataProvider";

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

  const { customSectionTitle } = useData();

  const keys = Object.keys(value);
  const allSections = Object.values(DEFAULT_SECTIONS).flat();

  const missingSections = getMissingSections(keys, allSections);

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
        borderRadius={"md"}
        p='1rem'
        className='resume-preview'
        ref={ref}
        style={styles}
      >
        {sections.default.map((section: string) => {
          switch (section) {
            case "personal-details":
              return (
                value?.["personal-details"] && (
                  <Header data={value?.["personal-details"]} />
                )
              );
            case "profile-summary":
              return (
                value?.["profile-summary"] && (
                  <ProfileSummary data={value?.["profile-summary"]} />
                )
              );
            case "professional-experience":
              return (
                value?.["professional-experience"] && (
                  <ProfessionalExperience
                    data={value?.["professional-experience"]}
                  />
                )
              );
            case "education":
              return (
                value?.["education"] && (
                  <Education data={value?.["education"]} />
                )
              );
            case "internships":
              return (
                value?.["internships"] && (
                  <Internships data={value?.["internships"]} />
                )
              );
            case "links":
              return value?.["links"] && <Links data={value?.["links"]} />;
            case "hobbies":
              return (
                value?.["hobbies"] && <Hobbies data={value?.["hobbies"]} />
              );
            case "courses":
              return (
                value?.["courses"] && <Courses data={value?.["courses"]} />
              );
            case "extra-curricular-activities":
              return (
                value?.["extra-curricular-activities"] && (
                  <ExtraCurricularActivities
                    data={value?.["extra-curricular-activities"]}
                  />
                )
              );
            case "references":
              return (
                value?.["references"] && (
                  <References data={value?.["references"]} />
                )
              );
            case "skills":
              return value?.["skills"] && <Skills data={value?.["skills"]} />;
            case "languages":
              return (
                value?.["languages"] && (
                  <Languages data={value?.["languages"]} />
                )
              );
            case titleCaseToDashCase(customSectionTitle):
              if (customSectionTitle) {
                return (
                  value?.[
                    titleCaseToDashCase(customSectionTitle) as string
                  ] && (
                    <CustomSection
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
          if (sections.default.includes(key) && customSectionTitle !== key) {
            return (
              value?.[titleCaseToDashCase(key) as string] && (
                <CustomSection
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
