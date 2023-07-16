/* eslint-disable react/display-name */
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Header from "./ResumePreview/Header";
import { forwardRef, MutableRefObject } from "react";
import ProfileSummary from "./ResumePreview/ProfileSummary";
import Hobbies from "./ResumePreview/Hobbies";
import Courses from "./ResumePreview/Courses";
import References from "./ResumePreview/References";
import Skills from "./ResumePreview/Skills";
import Languages from "./ResumePreview/Languages";
import Links from "./ResumePreview/Links";
import Education from "./ResumePreview/Education";
import Internships from "./ResumePreview/Internships";
import ProfessionalExperience from "./ResumePreview/ProfessionalExperience";
import ExtraCurricularActivities from "./ResumePreview/ExtraCurricularActivities";
import CustomSection from "./ResumePreview/CustomSection";
import { titleCaseToDashCase } from "@/utils/caseManipulation";
import { SetStateAction, Dispatch } from "react";

interface PreviewProps {
  sections: { default: string[]; extra: string[] };
  value: any;
  customSectionTitle: string;
  ref: MutableRefObject<any>;
  shareableLink: string;
  setShareableLink: Dispatch<SetStateAction<string>>;
}

const encodeResumeData = (data: any) => {
  const encodedData = encodeURIComponent(JSON.stringify(data));
  return encodedData;
};

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const {
    sections,
    value,
    customSectionTitle,
    setShareableLink,
    shareableLink,
  } = props;

  const generateShareableURL = () => {
    console.log({ value });

    const encodedData = encodeResumeData(value);
    console.log({ encodedData });
    const baseURL = window.location.origin; // Get the base URL of your app
    const shareURL = `${baseURL}/share?resume=${encodedData}`;
    return shareURL;
  };

  const handleShareClick = () => {
    const shareURL = generateShareableURL();
    console.log({ shareURL });

    setShareableLink(shareURL);
  };

  return (
    <Box
      flex={{ base: "none", sm: "45%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
    >
      <Flex justifyContent={"flex-start"} alignItems={"center"} gap='1rem'>
        <Heading as='h3' size='xs' mb='0.5rem'>
          Preview
        </Heading>
        <Text
          cursor={"pointer"}
          fontSize={"sm"}
          mb='0.3rem'
          onClick={handleShareClick}
        >
          Share
        </Text>
      </Flex>
      <Box
        border={"1px solid black"}
        m='0.5rem'
        borderRadius={"md"}
        p='1rem'
        className='resume-preview'
        ref={ref}
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
              return (
                value?.[titleCaseToDashCase(customSectionTitle)] && (
                  <CustomSection
                    data={value?.[titleCaseToDashCase(customSectionTitle)]}
                  />
                )
              );
            default:
              return null;
          }
        })}
      </Box>
    </Box>
  );
});

export default Preview;
