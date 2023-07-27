import {
  Image,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  findKeyAndObjectForSelectedText,
  isTextInDescription,
} from "../../utils/hasValidCharacters";
import { useData } from "./DataProvider";
import { useState } from "react";
import { getAISuggestions } from "../../services/getAISuggestions";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AI_SUGGESTIONS_OPTIONS } from "../../utils/defaults";
import { PersonalDetailsI } from "../../types/interfaces";

export const AISuggestions = () => {
  const { value, selectedText, dispatch, status } = useData();

  const [selectedOption, setSelectedOption] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const hoverBgColor = useColorModeValue("#edeff7", "#1a202c");

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
      toast.error(
        "Please enter personal details such as first name, job title and country to use AI suggestions.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
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
  );
};
