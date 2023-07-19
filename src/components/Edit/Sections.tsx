import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch } from "react";
import { IoMdAdd } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import custom_section from "../../data/custom-section.json";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";
import SectionCard from "../Sections/SectionCard";

import { useRef, MouseEvent } from "react";
import {
  titleCaseToSnakeCase,
  titleCaseToDashCase,
  dashCaseToTitleCase,
  dashToSnakeCase,
} from "../../utils/caseManipulation";
import { CustomSectionI } from "../../types/interfaces";
import { DEFAULT_SECTIONS, DEFAULT_SECTIONS_JSON } from "../../utils/defaults";
import { AddCustomSectionModal } from "../Sections/AddCustomSectionModal";
import AlertResetSectionsModal from "../Sections/AlertResetSectionsModal";

type SectionsProps = {
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
  customSectionTitle: string;
  setCustomSectionTitle: Dispatch<SetStateAction<string>>;
};

const Sections = ({
  sections,
  setSections,
  setValue,
  moveCard,
  customSectionTitle,
  setCustomSectionTitle,
}: SectionsProps) => {
  const {
    isOpen: resetSectionsIsOpen,
    onOpen: resetSectionsOnOpen,
    onClose: resetSectionsOnClose,
  } = useDisclosure();

  const {
    isOpen: resetSectionValueIsOpen,
    onOpen: resetSectionValueOnOpen,
    onClose: resetSectionValueOnClose,
  } = useDisclosure();

  const {
    isOpen: addCustomSectionIsOpen,
    onOpen: addCustomSectionOnOpen,
    onClose: addCustomSectionOnClose,
  } = useDisclosure();

  const initialAddCustomSectionModalRef = useRef(null);

  const addSection = (event: MouseEvent<HTMLDivElement>) => {
    const sectionKey = titleCaseToSnakeCase(
      (event.target as HTMLDivElement).innerText
    );
    const sectionData = DEFAULT_SECTIONS_JSON[sectionKey] || {};

    setSections((sections) => {
      const updatedSections = {
        default: [
          ...sections.default,
          titleCaseToDashCase(
            (event.target as HTMLDivElement).innerText
          ) as string,
        ],
        extra: sections.extra.filter(
          (section) =>
            section !==
            (titleCaseToDashCase(
              (event.target as HTMLDivElement).innerText
            ) as string)
        ),
      };
      localStorage?.setItem("resumeSections", JSON.stringify(updatedSections));
      return updatedSections;
    });

    setValue((value) => {
      const mergedData = { ...JSON.parse(value), ...sectionData };
      localStorage?.setItem("resumeData", JSON.stringify(mergedData, null, 2));
      return JSON.stringify(mergedData, null, 2);
    });
  };

  const removeAddedSection = (
    event: MouseEvent<HTMLButtonElement>,
    section: string
  ) => {
    event.stopPropagation();

    setSections((sections) => {
      const updatedSections = {
        default: sections.default.filter((sec) => sec !== section),
        extra: [section, ...sections.extra],
      };
      localStorage?.setItem("resumeSections", JSON.stringify(updatedSections));
      return updatedSections;
    });

    setValue((value) => {
      const JSONValue = JSON.parse(value);
      const { [section]: _, ...rest } = JSONValue;
      localStorage?.setItem("resumeData", JSON.stringify(rest, null, 2));
      return JSON.stringify(rest, null, 2);
    });
  };

  const resetDefaultSection = (section: string) => {
    const sectionData = DEFAULT_SECTIONS_JSON[dashToSnakeCase(section)] || {};

    setValue((value) => {
      const JSONValue = JSON.parse(value);
      const { [section]: _, ...rest } = JSONValue;
      const mergedData = { ...rest, ...sectionData };
      localStorage?.setItem("resumeData", JSON.stringify(mergedData, null, 2));
      return JSON.stringify(mergedData, null, 2);
    });
  };

  const resetSections = () => {
    setSections(DEFAULT_SECTIONS);
    localStorage?.setItem("resumeSections", JSON.stringify(DEFAULT_SECTIONS));
    setValue(JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2));
    localStorage?.setItem(
      "resumeData",
      JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
    );
  };

  const addCustomSection = () => {
    if (customSectionTitle && customSectionTitle.length > 0) {
      setSections((sections) => {
        const updatedSections = {
          ...sections,
          default: [
            ...sections.default,
            titleCaseToDashCase(customSectionTitle) as string,
          ],
        };

        localStorage?.setItem(
          "resumeSections",
          JSON.stringify(updatedSections)
        );
        return updatedSections;
      });

      const customSection: CustomSectionI = custom_section;

      setValue((value) => {
        const updatedCustomSection: CustomSectionI = {
          ...customSection,
          [titleCaseToDashCase(customSectionTitle) as string]: {
            ...customSection["untitled"],
            title: customSectionTitle,
          },
        };

        delete updatedCustomSection["untitled"];

        updatedCustomSection[
          titleCaseToDashCase(customSectionTitle) as string
        ].title = customSectionTitle;

        const mergedData = { ...JSON.parse(value), ...updatedCustomSection };
        localStorage?.setItem(
          "resumeData",
          JSON.stringify(mergedData, null, 2)
        );
        return JSON.stringify(mergedData, null, 2);
      });

      setCustomSectionTitle("");
      addCustomSectionOnClose();
    }
  };

  return (
    <Box
      flex={{ base: "none", sm: "20%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
      pl='0.8rem'
    >
      <AlertResetSectionsModal
        isOpen={resetSectionsIsOpen}
        onClose={resetSectionsOnClose}
        resetSections={resetSections}
      />

      <AddCustomSectionModal
        initialRef={initialAddCustomSectionModalRef}
        isOpen={addCustomSectionIsOpen}
        onClose={addCustomSectionOnClose}
        customSectionTitle={customSectionTitle}
        setCustomSectionTitle={setCustomSectionTitle}
        addCustomSection={addCustomSection}
      />

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as='h3' size='xs'>
          Sections
        </Heading>
        <Button
          variant={"ghost"}
          display={"flex"}
          fontSize={"xs"}
          gap='0.5rem'
          height={8}
          onClick={resetSectionsOnOpen}
        >
          <GrPowerReset /> Reset
        </Button>
      </Flex>
      <Box>
        <Text fontSize={"0.7rem"}>
          Click on a section below to edit the content.
        </Text>
        {sections.default.map((section, index) => {
          return (
            <SectionCard
              key={index}
              section={section}
              isOpen={resetSectionValueIsOpen}
              onClose={resetSectionValueOnClose}
              onOpen={resetSectionValueOnOpen}
              resetDefaultSection={resetDefaultSection}
              removeAddedSection={removeAddedSection}
              index={index}
              moveCard={moveCard}
            />
          );
        })}
      </Box>
      <Box>
        {sections.extra.length !== 0 && (
          <Text fontSize={"0.7rem"}>
            Click on a section to add it to your resume.
          </Text>
        )}
        <Box
          boxShadow={"md"}
          p={"0.5rem 0.8rem"}
          m={"0.8rem"}
          fontSize={"sm"}
          cursor={"pointer"}
          borderRadius={"0.3rem"}
          display='flex'
          alignItems='center'
          gap='0.5rem'
          justifyContent='center'
          onClick={addCustomSectionOnOpen}
        >
          <IoMdAdd /> Custom Section
        </Box>
        {sections.extra.map((section, index) => {
          return (
            <>
              <Box
                key={index}
                boxShadow={"md"}
                p={"0.5rem 0.8rem"}
                m={"0.8rem"}
                cursor={"pointer"}
                fontSize={"sm"}
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
