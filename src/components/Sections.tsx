import { Box, Heading, Text } from "@chakra-ui/react";
import { SetStateAction, Dispatch } from "react";
import professional_summary from "@/data/professional-summary.json";
import education from "@/data/education.json";
import professional_experience from "@/data/professional-experience.json";
import personal_details from "@/data/default-resume.json";

function dashCaseToTitleCase(str: string) {
  const words = str.split("-");
  const capitalizedWords = words.map(
    (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

function titleCaseToDashCase(str: string) {
  return str.replace(/\s+/g, "-").toLowerCase();
}

function titleCaseToSnakeCase(str: string) {
  return str.replace(/\s+/g, "_").toLowerCase();
}

const Sections = ({
  value,
  sections,
  setSections,
  setValue,
}: {
  value: string;
  sections: {
    default: string[];
    extra: string[];
  };
  setSections: Dispatch<
    SetStateAction<{
      default: string[];
      extra: string[];
    }>
  >;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const sectionsJSON = {
    personal_details,
    professional_summary,
    education,
    professional_experience,
  };

  //   const addSection = (event: any) => {
  //     setSections((sections) => ({
  //       default: [
  //         ...sections.default,
  //         titleCaseToDashCase(event.target.innerText),
  //       ],
  //       extra: sections.extra.filter(
  //         (section) => section !== titleCaseToDashCase(event.target.innerText)
  //       ),
  //     }));

  //     // const mergedJSON = {
  //     //   ...JSON.parse(value),
  //     //   ...(sectionsJSON[titleCaseToSnakeCase(event.target.innerText)] || {}),
  //     // };

  //     // console.log(mergedJSON);

  //     // setValue((value) => {
  //     //   const mergedJSON = {
  //     //     ...JSON.parse(value),
  //     //     ...(sectionsJSON[titleCaseToSnakeCase(event.target.innerText)] || {}),
  //     //   };
  //     //   return JSON.stringify(mergedJSON, null, 2);
  //     // });
  //     setValue((value) => {
  //       return JSON.stringify(
  //         sectionsJSON[titleCaseToSnakeCase(event.target.innerText)] || {},
  //         null,
  //         2
  //       );
  //     });
  //   };

  const addSection = (event: any) => {
    const sectionKey = titleCaseToSnakeCase(event.target.innerText);
    const sectionData = sectionsJSON[sectionKey] || {};

    setSections((sections) => ({
      default: [
        ...sections.default,
        titleCaseToDashCase(event.target.innerText),
      ],
      extra: sections.extra.filter(
        (section) => section !== titleCaseToDashCase(event.target.innerText)
      ),
    }));

    setValue((value) => {
      const mergedData = { ...JSON.parse(value), ...sectionData };
      return JSON.stringify(mergedData, null, 2);
    });
  };

  const showSection = (event: any) => {
    setValue((value) => {
      return JSON.stringify(
        sectionsJSON[titleCaseToSnakeCase(event.target.innerText)] || {},
        null,
        2
      );
    });
  };

  return (
    <Box
      flex={{ base: "none", sm: "20%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
      pl='1rem'
    >
      <Heading as='h3' size='md' mb='0.5rem'>
        Sections
      </Heading>
      <Box my='2rem'>
        <Text>Click on a section below to edit the content.</Text>
        {sections.default.map((section, index) => {
          return (
            <Box
              key={index}
              boxShadow={"md"}
              p={"0.5rem 1rem"}
              fontSize={"lg"}
              cursor={"pointer"}
              m={"1rem"}
              onClick={showSection}
              borderRadius={"0.3rem"}
            >
              {dashCaseToTitleCase(section)}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Text>Click on a section to add it to your resume.</Text>
        {sections.extra.map((section, index) => {
          return (
            <Box
              key={index}
              boxShadow={"md"}
              p={"0.5rem 1rem"}
              fontSize={"lg"}
              cursor={"pointer"}
              m={"1rem"}
              borderRadius={"0.3rem"}
              onClick={addSection}
            >
              {dashCaseToTitleCase(section)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sections;
