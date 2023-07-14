import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch } from "react";
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
import { IoMdAdd } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import INITIAL_DEFAULT_RESUME from "@/data/default-resume.json";
import AlertResetSectionsModal from "./AlertResetSectionsModal";
import AlertResetSectionValueModal from "./AlertResetSectionValueModal";
import {
  dashCaseToTitleCase,
  dashToSnakeCase,
  titleCaseToDashCase,
  titleCaseToSnakeCase,
} from "@/app/utils/caseManipulation";
import { DEFAULT_SECTIONS } from "@/app/defaults";
import SectionCard from "./SectionCard";

const Sections = ({
  sections,
  setSections,
  setValue,
  moveCard,
}: {
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
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const sectionsJSON = {
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

  const {
    isOpen: resetSectionsIsOpen,
    onOpen: resetSectionsOnOpen,
    onClose: resetSectionsOnClose,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const removeAddedSection = (event: any, section: string) => {
    event.stopPropagation();

    setSections((sections) => ({
      default: sections.default.filter((sec) => sec !== section),
      extra: [section, ...sections.extra],
    }));

    setValue((value) => {
      const JSONValue = JSON.parse(value);
      const { [section]: _, ...rest } = JSONValue;
      return JSON.stringify(rest, null, 2);
    });
  };

  const resetDefaultSection = (section: string) => {
    const sectionData = sectionsJSON[dashToSnakeCase(section)] || {};

    setValue((value) => {
      const JSONValue = JSON.parse(value);
      const { [section]: _, ...rest } = JSONValue;
      const mergedData = { ...rest, ...sectionData };
      return JSON.stringify(mergedData, null, 2);
    });
  };

  const resetSections = () => {
    setSections(DEFAULT_SECTIONS);
    setValue(JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2));
  };

  return (
    <Box
      flex={{ base: "none", sm: "20%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
      pl='1rem'
    >
      <AlertResetSectionsModal
        isOpen={resetSectionsIsOpen}
        onClose={resetSectionsOnClose}
        resetSections={resetSections}
      />

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as='h3' size='md'>
          Sections
        </Heading>
        <Button
          variant={"ghost"}
          display={"flex"}
          gap='0.5rem'
          onClick={resetSectionsOnOpen}
        >
          <GrPowerReset /> Reset
        </Button>
      </Flex>
      <Box my='1rem'>
        <Text>Click on a section below to edit the content.</Text>
        {sections.default.map((section, index) => {
          return (
            <SectionCard
              key={index}
              section={section}
              showSection={showSection}
              isOpen={isOpen}
              onClose={onClose}
              resetDefaultSection={resetDefaultSection}
              onOpen={onOpen}
              removeAddedSection={removeAddedSection}
              index={index}
              moveCard={moveCard}
            />
          );
        })}
      </Box>
      <Box>
        {sections.extra.length !== 0 && (
          <Text>Click on a section to add it to your resume.</Text>
        )}
        <Box
          boxShadow={"md"}
          p={"0.5rem 1rem"}
          fontSize={"xl"}
          cursor={"pointer"}
          m={"1rem"}
          borderRadius={"0.3rem"}
          display='flex'
          alignItems='center'
          gap='1rem'
          justifyContent='center'
        >
          <IoMdAdd /> Custom Section
        </Box>
        {sections.extra.map((section, index) => {
          return (
            <>
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
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sections;
