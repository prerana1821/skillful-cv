import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { validJSON } from "../../utils/validJSON";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import {
  findKeyAndObjectForSelectedText,
  isTextInDescription,
} from "../../utils/hasValidCharacters";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { AI_SUGGESTIONS_OPTIONS } from "../../utils/defaults";
import { PersonalDetailsI } from "../../types/interfaces";
import { useData } from "./DataProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { getAISuggestions } from "../../services/getAISuggestions";

ace.config.setModuleUrl(
  "ace/mode/json_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-json.js"
);

const EditorJSON = () => {
  const aceEditor = useRef<AceEditor | null>(null);

  const { value, selectedText, dispatch, status } = useData();

  const [selectedOption, setSelectedOption] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const hoverBgColor = useColorModeValue("#edeff7", "#1a202c");

  function onChange(newValue: string) {
    if (validJSON(newValue)) {
      dispatch({
        type: "ADD_RESUME_DATA",
        payload: newValue,
      });
    }
  }

  const handleAISuggestions = async (selectedOption: string) => {
    setSelectedOption(selectedOption);

    const selectedValue = findKeyAndObjectForSelectedText(
      selectedText,
      JSON.parse(value)
    );

    const valueFromPrompt = JSON.parse(value);
    const personalDetails: PersonalDetailsI =
      valueFromPrompt["personal-details"];

    const { descriptionList, ...selectedObjectWithoutDescList } =
      selectedValue?.object;

    if (
      !personalDetails["first-name"] ||
      !personalDetails["job-title"] ||
      !personalDetails["country"]
    ) {
      toast.error("Please enter personal details to use AI suggestions.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      getAISuggestions({
        dispatch,
        personalDetails,
        selectedOption,
        selectedValue,
        selectedObjectWithoutDescList,
        valueFromPrompt,
        setIsPopoverOpen,
      });
    }
  };

  return (
    <Box
      flex={{ base: "none", sm: "35%" }}
      height={{ base: "100vh", sm: "auto" }}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as='h3' size='xs' mb='0.5rem'>
          Editor
        </Heading>
        <Popover isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)}>
          <PopoverTrigger>
            <div>
              {selectedText.length > 0 &&
              isTextInDescription(selectedText, JSON.parse(value)) ? (
                <Image
                  src='/ai-suggest.gif'
                  alt='AI Suggestion'
                  width='25px'
                  cursor='pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPopoverOpen(true);
                  }}
                />
              ) : null}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Let AI help you ...</PopoverHeader>
              <PopoverBody>
                {status.loading ? (
                  <Image
                    src='/loading.gif'
                    alt='Loading...'
                    m='auto'
                    width={"50px"}
                  />
                ) : (
                  <List spacing={3}>
                    {AI_SUGGESTIONS_OPTIONS.map((option) => {
                      return (
                        <ListItem
                          key={option.value}
                          onClick={() => handleAISuggestions(option.value)}
                          p='0.5rem'
                          borderRadius={"md"}
                          _hover={{
                            backgroundColor: hoverBgColor,
                            cursor: "pointer",
                          }}
                        >
                          <ListIcon as={option.icon} color='#F50057' />
                          {option.label}
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </PopoverBody>
            </motion.div>
          </PopoverContent>
        </Popover>
      </Flex>
      <AceEditor
        ref={aceEditor}
        placeholder='Start writing your resume'
        mode='json'
        theme='solarized_dark'
        width='100%'
        height='96.5%'
        name='editor'
        style={{ overflowX: "hidden" }}
        wrapEnabled={true}
        onChange={onChange}
        fontSize={14}
        className='ace-editor'
        showPrintMargin={true}
        showGutter={true}
        onSelectionChange={(v, e) => {
          if (aceEditor && aceEditor.current) {
            dispatch({
              type: "ADD_SELECTED_TEXT",
              payload: aceEditor?.current?.editor.getSelectedText(),
            });
          }
        }}
        highlightActiveLine={true}
        editorProps={{ $blockScrolling: true }}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </Box>
  );
};

export default EditorJSON;
