import { useRef, useCallback, useEffect } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import Preview from "./Preview";
import Sections from "./Sections";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditorJSON from "./EditorJSON";
import Navbar from "../Layout/Navbar";

import { ShareLinkModal } from "../Share/ShareLinkModal";
import { useData } from "./DataProvider";
import { ShareQRCodeModal } from "../Share/ShareQRCodeModal";
import { SelectTemplateModal } from "../Templates/SelectTemplateModal";

export const Editor = () => {
  const { sections, dispatch, value } = useData();

  const componentRef = useRef(null);

  const {
    isOpen: shareLinkIsOpen,
    onOpen: shareLinkOnOpen,
    onClose: shareLinkOnClose,
  } = useDisclosure();

  const {
    isOpen: shareQRCodeIsOpen,
    onOpen: shareQRCodeOnOpen,
    onClose: shareQRCodeOnClose,
  } = useDisclosure();

  const {
    isOpen: selectTemplateIsOpen,
    onOpen: selectTemplateOnOpen,
    onClose: selectTemplateOnClose,
  } = useDisclosure();

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  useEffect(() => {
    try {
      // TODO: add loading status
      const resumeData = localStorage?.getItem("resumeData");
      const resumeSections = localStorage?.getItem("resumeSections");
      if (resumeData) {
        dispatch({ type: "ADD_RESUME_DATA", payload: resumeData });
      }
      if (resumeSections) {
        dispatch({
          type: "ADD_SECTIONS",
          payload: JSON.parse(resumeSections),
        });
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
        alignItems={"center"}
        gap={"0.3rem"}
        backgroundColor='#f50057'
        color='#fff'
        fontSize={"sm"}
        _hover={{ backgroundColor: "none" }}
      >
        <PiDownloadSimple fontSize='md' />
        Download
      </Button>
    );
  }, []);

  useEffect(() => {
    const updatedSections = {
      default: sections.default,
      extra: sections.extra,
    };
    localStorage?.setItem("resumeSections", JSON.stringify(updatedSections));
  }, [sections]);

  useEffect(() => {
    localStorage?.setItem("resumeData", value);
  }, [value]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar
        styles={{ boxShadow: "md" }}
        shareLinkOnOpen={shareLinkOnOpen}
        shareQRCodeOnOpen={shareQRCodeOnOpen}
        selectTemplateOnOpen={selectTemplateOnOpen}
        downloadComp={
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle='Skillful-CV'
            trigger={reactToPrintTrigger}
          />
        }
      />

      <ShareLinkModal isOpen={shareLinkIsOpen} onClose={shareLinkOnClose} />
      <ShareQRCodeModal
        isOpen={shareQRCodeIsOpen}
        onClose={shareQRCodeOnClose}
      />

      <SelectTemplateModal
        isOpen={selectTemplateIsOpen}
        onClose={selectTemplateOnClose}
      />

      <Box overflowY='hidden' mt='1rem' mb='0.5rem'>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap='0.5rem'
          height={{ sm: "88vh" }}
        >
          <Sections />

          <EditorJSON />

          <Preview
            showHeading
            sections={sections}
            value={JSON.parse(value)}
            ref={componentRef}
          />
        </Flex>
      </Box>
    </DndProvider>
  );
};
