/* eslint-disable react/display-name */
import { Box, Heading } from "@chakra-ui/react";
import Header from "./ResumePreview/Header";
import { forwardRef } from "react";
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

const Preview = forwardRef((props, ref) => {
  const { value } = props;

  return (
    <Box
      flex={{ base: "none", sm: "45%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
    >
      <Heading as='h3' size='md' mb='0.5rem'>
        Preview
      </Heading>
      <Box
        border={"1px solid black"}
        m='1rem'
        borderRadius={"md"}
        p='1rem'
        className='resume-preview'
        ref={ref}
      >
        <Header value={value} />
        {value?.["profile-summary"] && <ProfileSummary value={value} />}
        {value?.["professional-experience"] && (
          <ProfessionalExperience data={value?.["professional-experience"]} />
        )}
        {value?.["education"] && <Education data={value?.["education"]} />}
        {value?.["internships"] && (
          <Internships data={value?.["internships"]} />
        )}
        {value?.["links"] && <Links data={value?.["links"]} />}
        {value?.["hobbies"] && <Hobbies data={value?.["hobbies"]} />}
        {value?.["courses"] && <Courses data={value?.["courses"]} />}
        {value?.["extra-curricular-activities"] && (
          <ExtraCurricularActivities
            data={value?.["extra-curricular-activities"]}
          />
        )}
        {value?.["references"] && <References data={value?.["references"]} />}
        {value?.["skills"] && <Skills data={value?.["skills"]} />}
        {value?.["languages"] && <Languages data={value?.["languages"]} />}
      </Box>
    </Box>
  );
});

export default Preview;
