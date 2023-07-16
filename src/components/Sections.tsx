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
} from "@/utils/caseManipulation";
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
import { useRef, MouseEvent } from "react";
import custom_section from "@/data/custom-section.json";
import { CustomSectionI } from "@/types/interfaces";

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

  const addSection = (event: MouseEvent<HTMLDivElement>) => {
    const sectionKey = titleCaseToSnakeCase(
      (event.target as HTMLDivElement).innerText
    );
    const sectionData = DEFAULT_SECTIONS_JSON[sectionKey] || {};

    setSections((sections) => ({
      default: [
        ...sections.default,
        titleCaseToDashCase((event.target as HTMLDivElement).innerText),
      ],
      extra: sections.extra.filter(
        (section) =>
          section !==
          titleCaseToDashCase((event.target as HTMLDivElement).innerText)
      ),
    }));

    setValue((value) => {
      const mergedData = { ...JSON.parse(value), ...sectionData };
      return JSON.stringify(mergedData, null, 2);
    });
  };

  const removeAddedSection = (
    event: MouseEvent<HTMLButtonElement>,
    section: string
  ) => {
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

    const customSection: CustomSectionI = custom_section;

    setValue((value) => {
      const updatedCustomSection: CustomSectionI = Object.defineProperty(
        customSection,
        titleCaseToDashCase(customSectionTitle),
        Object.getOwnPropertyDescriptor(customSection, "untitled")!
      );
      if (customSection.hasOwnProperty("untitled")) {
        delete customSection["untitled"];
      }

      updatedCustomSection[titleCaseToDashCase(customSectionTitle)].title =
        customSectionTitle;

      const mergedData = { ...JSON.parse(value), ...updatedCustomSection };

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
      pl='0.8rem'
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
          m={"0.8rem 0.5rem"}
          fontSize={"sm"}
          cursor={"pointer"}
          borderRadius={"0.3rem"}
          display='flex'
          alignItems='center'
          gap='0.5rem'
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
                p={"0.5rem 0.8rem"}
                m={"0.5rem"}
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
