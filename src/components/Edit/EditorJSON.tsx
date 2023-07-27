import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
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
import axios from "axios";
import { AI_SUGGESTIONS_OPTIONS } from "../../utils/defaults";
import {
  Education,
  PersonalDetailsI,
  ProfessionalExperience,
} from "../../types/interfaces";
import { useData } from "./DataProvider";

const API_URL = process.env.REACT_APP_API_BASE_URL;

ace.config.setModuleUrl(
  "ace/mode/json_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-json.js"
);

const EditorJSON = () => {
  const aceEditor = useRef<AceEditor | null>(null);

  const { value, selectedText, dispatch } = useData();

  const [selectedOption, setSelectedOption] = useState("");

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

    // TODO: if name, jobtitle & country is not present give an alert.
    // TODO: show loading state

    const { descriptionList, ...selectedObjectWithoutDescList } =
      selectedValue?.object;

    try {
      const response = await axios.post(`${API_URL}ai-suggestions`, {
        name: personalDetails["first-name"],
        jobTitle: personalDetails["job-title"],
        country: personalDetails["country"],
        key: selectedValue?.key,
        selectedOption,
        selectedText:
          selectedValue?.object.description || selectedValue?.selectedItem,
        selectedObject: selectedObjectWithoutDescList,
      });
      if (response.status === 200) {
        const generatedText = response.data;

        switch (selectedValue?.key) {
          case "profile-summary":
            valueFromPrompt["profile-summary"].description = generatedText.data;
            break;
          case "education":
            valueFromPrompt["education"].list = valueFromPrompt[
              "education"
            ].list.map((item: Education) => {
              return item.institution === selectedValue?.object?.institution
                ? { ...item, description: generatedText.data }
                : item;
            });
            break;
          case "professional-experience":
            valueFromPrompt["professional-experience"].list = valueFromPrompt[
              "professional-experience"
            ].list.map((item: ProfessionalExperience) => {
              return item.employer === selectedValue?.object?.employer
                ? {
                    ...item,
                    descriptionList: item?.descriptionList?.map(
                      (description: string) => {
                        return description === selectedValue?.selectedItem
                          ? generatedText.data
                          : description;
                      }
                    ),
                  }
                : item;
            });
            break;
          default:
            break;
        }

        dispatch({
          type: "ADD_RESUME_DATA",
          payload: JSON.stringify(valueFromPrompt, null, 2),
        });
      }
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
              {selectedText.length > 0 &&
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
                      onClick={() => handleAISuggestions(option.value)}
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
