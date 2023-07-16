"use client";

import { useState, useRef, useCallback } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Sections from "@/components/Sections";
import INITIAL_DEFAULT_RESUME from "@/data/default-resume.json";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DEFAULT_SECTIONS } from "../defaults";
import dynamic from "next/dynamic";

// const Editor = dynamic(() => import("@/components/Editor"), {
//   ssr: false,
// });

export default function Page() {
  const [value, setValue] = useState(
    JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  );
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [shareableLink, setShareableLink] = useState("");

  const componentRef = useRef(null);
  const aceEditor = useRef();

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

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
        position='absolute'
        right='1rem'
        top='-1'
        variant='ghost'
        display={"flex"}
        gap={"0.3rem"}
        alignItems={"center"}
        fontSize={"sm"}
        _hover={{ backgroundColor: "none" }}
      >
        <PiDownloadSimple fontSize='md' />
        Download
      </Button>
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box overflowY='hidden' my='0.5rem'>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap='0.5rem'
          height='96vh'
        >
          <Sections
            sections={sections}
            setSections={setSections}
            customSectionTitle={customSectionTitle}
            setCustomSectionTitle={setCustomSectionTitle}
            setValue={setValue}
            moveCard={moveCard}
          />

          <Editor value={value} setValue={setValue} ref={aceEditor} />

          <ReactToPrint
            content={reactToPrintContent}
            documentTitle='Skillful-CV'
            trigger={reactToPrintTrigger}
          />

          <Preview
            shareableLink={shareableLink}
            setShareableLink={setShareableLink}
            sections={sections}
            value={JSON.parse(value)}
            customSectionTitle={customSectionTitle}
            ref={componentRef}
          />
        </Flex>
      </Box>
    </DndProvider>
  );
}
