"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Sections from "@/components/Sections";
import INITIAL_DEFAULT_RESUME from "@/data/default-resume.json";

export default function Page() {
  const [value, setValue] = useState(
    JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  );
  const [sections, setSections] = useState({
    default: ["personal-details"],
    extra: ["education", "professional-summary", "professional-experience"],
  });

  return (
    <>
      <Navbar />
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap='0.5rem'
        height='90.5vh'
      >
        <Sections
          value={value}
          sections={sections}
          setSections={setSections}
          setValue={setValue}
        />

        <Editor value={value} setValue={setValue} />

        <Preview value={JSON.parse(value)} />
      </Flex>
    </>
  );
}
