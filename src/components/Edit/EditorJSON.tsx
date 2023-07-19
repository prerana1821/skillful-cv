import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch, useRef } from "react";
import { validJSON } from "../../utils/validJSON";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { isTextInDescription } from "../../utils/hasValidCharacters";
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
import axios from "axios";
import { AI_SUGGESTIONS_OPTIONS } from "../../utils/defaults";

ace.config.setModuleUrl(
  "ace/mode/json_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-json.js"
);

type EditorJSONProps = {
  value: string;
  selectedText: string;
  setValue: Dispatch<SetStateAction<string>>;
  setSelectedText: Dispatch<SetStateAction<string>>;
};

const EditorJSON = ({
  value,
  setValue,
  selectedText,
  setSelectedText,
}: EditorJSONProps) => {
  const aceEditor = useRef<AceEditor | null>(null);

  const [selectedOption, setSelectedOption] = useState("");

  function onChange(newValue: string) {
    if (validJSON(newValue)) {
      setValue(newValue);
      localStorage?.setItem("resumeData", newValue);
    }
  }

  const handleClick = async (value: string) => {
    console.log("Hello", { selectedText, value });
    setSelectedOption(value);
    try {
      const response = await axios.post(
        "http://localhost:4000/ai-suggestions/continue-writing"
      );
      const generatedText = response.data;
      console.log(generatedText);
    } catch (error) {
      console.error(error);
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
        <Popover>
          <PopoverTrigger>
            <div>
              {selectedText &&
              selectedText.length > 0 &&
              isTextInDescription(selectedText, JSON.parse(value)) ? (
                <Image
                  src='/ai-suggest.gif'
                  alt='AI Suggestion'
                  width='25px'
                  cursor='pointer'
                />
              ) : null}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Let AI help you ...</PopoverHeader>
            <PopoverBody>
              <List spacing={3}>
                {AI_SUGGESTIONS_OPTIONS.map((option) => {
                  return (
                    <ListItem
                      key={option.value}
                      onClick={() => handleClick(option.value)}
                      p='0.5rem'
                      borderRadius={"md"}
                      _hover={{ backgroundColor: "#edeff7", cursor: "pointer" }}
                    >
                      <ListIcon as={option.icon} color='#F50057' />
                      {option.label}
                    </ListItem>
                  );
                })}
              </List>
            </PopoverBody>
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
            setSelectedText(aceEditor?.current?.editor.getSelectedText());
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
