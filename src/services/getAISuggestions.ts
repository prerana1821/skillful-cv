import { SetStateAction } from "react";
import axios from "axios";
import {
  Education,
  PersonalDetailsI,
  ProfessionalExperience,
} from "../types/interfaces";
import { DataReducerAction } from "../components/Edit/data.types";
const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getAISuggestions = async ({
  dispatch,
  personalDetails,
  selectedOption,
  selectedValue,
  selectedObjectWithoutDescList,
  valueFromPrompt,
  setIsPopoverOpen,
}: {
  dispatch: (action: DataReducerAction) => void;
  personalDetails: PersonalDetailsI;
  selectedOption: string;
  selectedValue:
    | {
        key: string;
        object: any;
        selectedItem?: undefined;
      }
    | {
        key: string;
        object: any;
        selectedItem: any;
      }
    | null;
  selectedObjectWithoutDescList: any;
  valueFromPrompt: any;
  setIsPopoverOpen: (value: SetStateAction<boolean>) => void;
}) => {
  try {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        loading: "suggestion is loading...",
      },
    });
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
        type: "CHANGE_STATUS",
        payload: {
          loading: "",
        },
      });
      dispatch({
        type: "ADD_RESUME_DATA",
        payload: JSON.stringify(valueFromPrompt, null, 2),
      });
      setIsPopoverOpen(false);
    }
  } catch (error) {
    console.error(error);
  }
};
