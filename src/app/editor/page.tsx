"use client";

import { useState, useRef, useCallback } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Sections from "@/components/Sections";
import INITIAL_DEFAULT_RESUME from "@/data/default-resume.json";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";

export const DEFAULT_SECTIONS = {
  default: ["personal-details"],
  extra: [
    "education",
    "profile-summary",
    "professional-experience",
    "courses",
    "extra-curricular-activities",
    "hobbies",
    "internships",
    "languages",
    "links",
    "references",
    "skills",
  ],
};
export default function Page() {
  const [value, setValue] = useState(
    JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  );
  const [sections, setSections] = useState(DEFAULT_SECTIONS);

  const componentRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    console.log(1, componentRef.current);
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    return (
      <Button
        position='absolute'
        right='1rem'
        top='0.5rem'
        variant='ghost'
        display={"flex"}
        gap={"0.3rem"}
        alignItems={"center"}
      >
        <PiDownloadSimple fontSize='lg' />
        Download
      </Button>
    );
  }, []);

  return (
    <Box overflowY='hidden' my='1rem'>
      {/* <Navbar
        styles={{
          "box-shadow": "8px 8px 27px #f0f0f0, -8px -8px 27px #ffffff",
          "margin-bottom": "2rem",
        }}
      /> */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap='0.5rem'
        height='96vh'
      >
        <Sections
          sections={sections}
          setSections={setSections}
          setValue={setValue}
        />

        <Editor value={value} setValue={setValue} />

        <ReactToPrint
          content={reactToPrintContent}
          documentTitle='AwesomeFileName'
          trigger={reactToPrintTrigger}
        />

        <Preview value={JSON.parse(value)} ref={componentRef} />
      </Flex>
    </Box>
  );
}
