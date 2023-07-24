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
import ShortUniqueId from "short-unique-id";
import axios from "axios";
import { ShareLinkModal } from "../Share/ShareLinkModal";
import { useData } from "./DataProvider";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const Editor = () => {
  // const [value, setValue] = useState(
  //   JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
  // );
  // const [sections, setSections] = useState(DEFAULT_SECTIONS);
  // const [customSectionTitle, setCustomSectionTitle] = useState("");
  // const [selectedText, setSelectedText] = useState<string>("");
  // const [resumeId, setResumeId] = useState("");

  const { sections, dispatch, value } = useData();

  console.log({ value, sections });

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
    dispatch({
      type: "UPDATE_SECTIONS",
      payload: updatedSections,
    });
    // localStorage?.setItem(
    //   "resumeSections",
    //   JSON.stringify({ ...sections, default: updatedSections })
    // );
    // setSections((sections) => {
    //   const updatedSects = { ...sections, default: updatedSections };
    //   return updatedSects;
    // });
    // setSections((sections) => {
    //   const updatedSects = { ...sections, default: updatedSections };
    //   localStorage?.setItem("resumeSections", JSON.stringify(updatedSects));
    //   return updatedSects;
    // });
  };

  useEffect(() => {
    try {
      // TODO: add loading status
      const resumeData = localStorage?.getItem("resumeData");
      const resumeSections = localStorage?.getItem("resumeSections");
      if (resumeData) {
        dispatch({ type: "ADD_RESUME_DATA", payload: resumeData });
        //  setValue(resumeData);
      }
      if (resumeSections) {
        dispatch({
          type: "ADD_SECTIONS",
          payload: JSON.parse(resumeSections),
        });
        //  setSections(JSON.parse(resumeSections));
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

  const shareResume = async () => {
    const uid = new ShortUniqueId({ length: 10 });
    const uniqueId = uid();
    const resumeJSON = JSON.parse(value);

    try {
      const response = await axios.post(`${API_URL}resumes`, {
        uniqueId,
        email: resumeJSON["personal-details"].email,
        resumeValue: value,
      });
      if (response.status === 200) {
        const resumeId = response.data.resumeId;
        // setResumeId(resumeId);
        dispatch({ type: "ADD_RESUME_ID", payload: resumeId });
        // setResumeId(resumeId);
        shareLinkOnOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        // resumeId={resumeId}
      />

      <Box overflowY='hidden' mt='1rem' mb='0.5rem'>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap='0.5rem'
          height={{ sm: "88vh" }}
        >
          <Sections
            // sections={sections}
            // setSections={setSections}
            // customSectionTitle={customSectionTitle}
            // setCustomSectionTitle={setCustomSectionTitle}
            // setValue={setValue}
            moveCard={moveCard}
          />

          <EditorJSON
          // value={value}
          // setValue={setValue}
          // selectedText={selectedText}
          // setSelectedText={setSelectedText}
          />

          <Preview
            showHeading
            sections={sections}
            value={JSON.parse(value)}
            // customSectionTitle={customSectionTitle}
            ref={componentRef}
          />
        </Flex>
      </Box>
    </DndProvider>
  );
};
