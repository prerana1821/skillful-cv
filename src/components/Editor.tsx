import { useState, useRef, useCallback } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Preview from "./Edit/Preview";
import Sections from "./Edit/Sections";
import INITIAL_DEFAULT_RESUME from "../data/default-resume.json";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DEFAULT_SECTIONS } from "../utils/defaults";
import EditorJSON from "./Edit/EditorJSON";
import Navbar from "./Layout/Navbar";
import ShortUniqueId from "short-unique-id";
import axios from "axios";

export const Editor = () => {
  const [value, setValue] = useState(
    JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  );
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [selectedText, setSelectedText] = useState<string>("");

  const componentRef = useRef(null);

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
    const resumeJSON = JSON.parse(value);

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
