import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch } from "react";
import { IoMdAdd } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import INITIAL_DEFAULT_RESUME from "@/data/default-resume.json";
import AlertResetSectionsModal from "./AlertResetSectionsModal";
import {
  dashCaseToTitleCase,
  dashToSnakeCase,
  titleCaseToDashCase,
  titleCaseToSnakeCase,
} from "@/app/utils/caseManipulation";
import { DEFAULT_SECTIONS, DEFAULT_SECTIONS_JSON } from "@/app/defaults";
import SectionCard from "./SectionCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import custom_section from "@/data/custom-section.json";

const Sections = ({
  sections,
  setSections,
  setValue,
  moveCard,
  customSectionTitle,
  setCustomSectionTitle,
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
  customSectionTitle: string;
  setCustomSectionTitle: Dispatch<SetStateAction<string>>;
}) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const addSection = (event: any) => {
    const sectionKey = titleCaseToSnakeCase(event.target.innerText);
    const sectionData = DEFAULT_SECTIONS_JSON[sectionKey] || {};

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
        DEFAULT_SECTIONS_JSON[titleCaseToSnakeCase(event.target.innerText)] ||
          {},
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
    const sectionData = DEFAULT_SECTIONS_JSON[dashToSnakeCase(section)] || {};

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

  const addCustomSection = () => {
    setSections((sections) => ({
      ...sections,
      default: [...sections.default, titleCaseToDashCase(customSectionTitle)],
    }));

    setValue((value) => {
      console.log(custom_section);

      const updatedCustomSection = Object.defineProperty(
        custom_section,
        titleCaseToDashCase(customSectionTitle),
        Object.getOwnPropertyDescriptor(custom_section, "untitled")
      );
      delete custom_section["untitled"];

      updatedCustomSection[titleCaseToDashCase(customSectionTitle)].title =
        customSectionTitle;

      console.log(updatedCustomSection);

      const mergedData = { ...JSON.parse(value), ...updatedCustomSection };
      console.log(mergedData);

      return JSON.stringify(mergedData, null, 2);
    });

    setCustomSectionTitle("");
    onClose();
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset='scale'
        size='lg'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Custom Section</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Section name</FormLabel>
              <Input
                ref={initialRef}
                value={customSectionTitle}
                onChange={(e) => setCustomSectionTitle(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter display={"flex"} gap='1rem'>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme='#F50057' mr={3} onClick={addCustomSection}>
              Add Section
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          onClick={onOpen}
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
