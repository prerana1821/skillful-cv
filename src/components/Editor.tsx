import { useState, useRef, useCallback, useEffect } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import Preview from "./Preview";
import Sections from "./Sections";
import INITIAL_DEFAULT_RESUME from "../data/default-resume.json";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DEFAULT_SECTIONS } from "../utils/defaults";
import EditorJSON from "./EditorJSON";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import ShortUniqueId from "short-unique-id";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Editor = () => {
  const [value, setValue] = useState(
    JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  );
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [selectedText, setSelectedText] = useState<string>("");

  const navigate = useNavigate();

  const componentRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   onOpen(); // Open the modal when the component mounts
  // }, []);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = sections.default[dragIndex];
    const updatedComps = [...sections.default];
    updatedComps.splice(dragIndex, 1);
    updatedComps.splice(hoverIndex, 0, draggedCard);
    setSections((sections) => {
      return { ...sections, default: updatedComps };
    });
  };

  const reactToPrintTrigger = useCallback(() => {
    return (
      <Button
        variant='solid'
        display={"flex"}
        gap={"0.3rem"}
        backgroundColor='#f50057'
        color='#fff'
        alignItems={"center"}
        fontSize={"sm"}
        _hover={{ backgroundColor: "none" }}
      >
        <PiDownloadSimple fontSize='md' />
        Download
      </Button>
    );
  }, []);

  const shareResume = async () => {
    const uid = new ShortUniqueId({ length: 10 });
    const uniqueId = uid();
    console.log({ uniqueId });

    const resumeJSON = JSON.parse(value);

    console.log(resumeJSON["personal-details"].email);

    try {
      const response = await axios.post("http://localhost:4000/resumes", {
        uniqueId,
        email: resumeJSON["personal-details"].email,
        resumeValue: value,
      });
      if (response.status === 200) {
        const resumeId = response.data.resumeId;
        window.open(`/share/${resumeId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar
        shareResume={shareResume}
        downloadComp={
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle='Skillful-CV'
            trigger={reactToPrintTrigger}
          />
        }
      />
      <Box overflowY='hidden' mt='1rem' mb='0.5rem'>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap='0.5rem'
          height='88vh'
        >
          {/* <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Hello world</ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal> */}
          <Sections
            sections={sections}
            setSections={setSections}
            customSectionTitle={customSectionTitle}
            setCustomSectionTitle={setCustomSectionTitle}
            setValue={setValue}
            moveCard={moveCard}
          />

          <EditorJSON
            value={value}
            setValue={setValue}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />

          <Preview
            showHeading
            sections={sections}
            value={JSON.parse(value)}
            customSectionTitle={customSectionTitle}
            ref={componentRef}
          />
        </Flex>
      </Box>
    </DndProvider>
  );
};
