import { useState, useRef, useCallback, useEffect } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import Preview from "./Preview";
import Sections from "./Sections";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DEFAULT_SECTIONS } from "../../utils/defaults";
import EditorJSON from "./EditorJSON";
import Navbar from "../Layout/Navbar";
import ShortUniqueId from "short-unique-id";
import axios from "axios";
import { ShareLinkModal } from "../Share/ShareLinkModal";

export const Editor = () => {
  const [value, setValue] = useState(
    JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  );
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [selectedText, setSelectedText] = useState<string>("");

  const [resumeId, setResumeId] = useState("");
  const [isResumeLinkCopied, setIsResumeLinkCopied] = useState(false);

  const componentRef = useRef(null);
  const {
    isOpen: shareLinkIsOpen,
    onOpen: shareLinkOnOpen,
    onClose: shareLinkOnClose,
  } = useDisclosure();

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = sections.default[dragIndex];
    const updatedSections = [...sections.default];
    updatedSections.splice(dragIndex, 1);
    updatedSections.splice(hoverIndex, 0, draggedCard);
    setSections((sections) => {
      const updatedSects = { ...sections, default: updatedSections };
      localStorage?.setItem("resumeSections", JSON.stringify(updatedSects));
      return updatedSects;
    });
  };

  useEffect(() => {
    try {
      const resumeData = localStorage?.getItem("resumeData");
      const resumeSections = localStorage?.getItem("resumeSections");
      if (resumeData) {
        setValue(resumeData);
      }
      if (resumeSections) {
        setSections(JSON.parse(resumeSections));
      }
    } catch (error) {
      console.error(
        "Error while retrieving resume data from localStorage:",
        error
      );
    }
  }, []);

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

  const copyLink = () => {
    navigator.clipboard
      .writeText(`https:localhost:3000/share/${resumeId}`)
      .then(() => {
        console.log("Link copied to clipboard:");
        setIsResumeLinkCopied(true);
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  };

  const shareResume = async () => {
    const uid = new ShortUniqueId({ length: 10 });
    const uniqueId = uid();
    const resumeJSON = JSON.parse(value);

    try {
      const response = await axios.post("http://localhost:4000/resumes", {
        uniqueId,
        email: resumeJSON["personal-details"].email,
        resumeValue: value,
      });
      if (response.status === 200) {
        const resumeId = response.data.resumeId;
        setResumeId(resumeId);
        shareLinkOnOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar
        styles={{ boxShadow: "md" }}
        shareResume={shareResume}
        downloadComp={
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle='Skillful-CV'
            trigger={reactToPrintTrigger}
          />
        }
      />

      <ShareLinkModal
        isOpen={shareLinkIsOpen}
        onClose={shareLinkOnClose}
        isResumeLinkCopied={isResumeLinkCopied}
        setIsResumeLinkCopied={setIsResumeLinkCopied}
        resumeId={resumeId}
        copyLink={copyLink}
      />

      <Box overflowY='hidden' mt='1rem' mb='0.5rem'>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap='0.5rem'
          height={{ sm: "88vh" }}
        >
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
