import {
  dashToSnakeCase,
  titleCaseToDashCase,
  titleCaseToSnakeCase,
} from "../../utils/caseManipulation";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";
import { DEFAULT_SECTIONS, DEFAULT_SECTIONS_JSON } from "../../utils/defaults";
import { CustomSectionI } from "../../types/interfaces";
import custom_section from "../../data/custom-section.json";
import { DataReducerAction, InitialResumeDataState } from "./data.types";

export const dataReducer = (
  state: InitialResumeDataState,
  action: DataReducerAction
): InitialResumeDataState => {
  const JSONValue = JSON.parse(state.value);
  const { [action.payload]: _, ...rest } = JSONValue;

  switch (action.type) {
    case "ADD_RESUME_DATA":
      localStorage?.setItem("resumeData", action.payload);
      return { ...state, value: action.payload };
    case "ADD_SECTIONS":
      localStorage?.setItem("resumeSections", JSON.stringify(action.payload));
      return { ...state, sections: action.payload };
    case "UPDATE_SECTIONS":
      localStorage?.setItem(
        "resumeSections",
        JSON.stringify({ ...state.sections, default: action.payload })
      );
      return {
        ...state,
        sections: { ...state.sections, default: action.payload },
      };
    case "ADD_RESUME_ID":
      return { ...state, resumeId: action.payload };
    case "ADD_CUSTOM_SECTION_TITLE":
      return { ...state, customSectionTitle: action.payload };
    case "REMOVE_ADDED_SECTION":
      localStorage?.setItem("resumeData", JSON.stringify(rest, null, 2));
      localStorage?.setItem(
        "resumeSections",
        JSON.stringify({
          default: state.sections.default.filter(
            (sec: string) => sec !== action.payload
          ),
          extra: [action.payload, ...state.sections.extra],
        })
      );
      return {
        ...state,
        sections: {
          default: state.sections.default.filter(
            (sec: string) => sec !== action.payload
          ),
          extra: [action.payload, ...state.sections.extra],
        },
        value: JSON.stringify(rest, null, 2),
      };
    case "RESET_DEFAULT_SECTION":
      const sectionData =
        DEFAULT_SECTIONS_JSON[dashToSnakeCase(action.payload)] || {};
      const mergedData = { ...rest, ...sectionData };
      localStorage?.setItem("resumeData", JSON.stringify(mergedData, null, 2));
      return { ...state, value: JSON.stringify(mergedData, null, 2) };
    case "RESET_SECTIONS":
      localStorage?.setItem("resumeSections", JSON.stringify(DEFAULT_SECTIONS));
      localStorage?.setItem(
        "resumeData",
        JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
      );
      return {
        ...state,
        value: JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2),
        sections: DEFAULT_SECTIONS,
      };
    case "CLEAR_CUSTOM_SECTION_TITLE":
      return { ...state, customSectionTitle: "" };
    case "ADD_CUSTOM_SECTION":
      const customSection: CustomSectionI = custom_section;
      const updatedCustomSection: CustomSectionI = {
        ...customSection,
        [titleCaseToDashCase(action.payload) as string]: {
          ...customSection["untitled"],
          title: action.payload,
        },
      };
      delete updatedCustomSection["untitled"];

      updatedCustomSection[
        titleCaseToDashCase(action.payload) as string
      ].title = action.payload;

      const mergedResumeData = {
        ...JSON.parse(state.value),
        ...updatedCustomSection,
      };
      localStorage?.setItem(
        "resumeData",
        JSON.stringify(mergedResumeData, null, 2)
      );
      localStorage?.setItem(
        "resumeSections",
        JSON.stringify({
          ...state.sections,
          default: [
            ...state.sections.default,
            titleCaseToDashCase(action.payload) as string,
          ],
        })
      );

      return {
        ...state,
        sections: {
          ...state.sections,
          default: [
            ...state.sections.default,
            titleCaseToDashCase(action.payload) as string,
          ],
        },
        value: JSON.stringify(mergedResumeData, null, 2),
        customSectionTitle: "",
      };
    case "ADD_SECTION":
      const addSectionData =
        DEFAULT_SECTIONS_JSON[titleCaseToSnakeCase(action.payload)] || {};
      localStorage?.setItem(
        "resumeData",
        JSON.stringify(
          { ...JSON.parse(state.value), ...addSectionData },
          null,
          2
        )
      );
      localStorage?.setItem(
        "resumeSections",
        JSON.stringify({
          default: [
            ...state.sections.default,
            titleCaseToDashCase(action.payload) as string,
          ],
          extra: state.sections.extra.filter(
            (section: string) =>
              section !== (titleCaseToDashCase(action.payload) as string)
          ),
        })
      );
      return {
        ...state,
        sections: {
          default: [
            ...state.sections.default,
            titleCaseToDashCase(action.payload) as string,
          ],
          extra: state.sections.extra.filter(
            (section: string) =>
              section !== (titleCaseToDashCase(action.payload) as string)
          ),
        },
        value: JSON.stringify(
          { ...JSON.parse(state.value), ...addSectionData },
          null,
          2
        ),
      };
    case "ADD_SELECTED_TEXT":
      return { ...state, selectedText: action.payload };
    case "CHANGE_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SET_TEMPLATE":
      return { ...state, template: action.payload };
    default:
      console.error("Something went wrong");
      return state;
  }
};
