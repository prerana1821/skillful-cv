import { createContext, useContext, useEffect, useReducer } from "react";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";
import { DEFAULT_SECTIONS } from "../../utils/defaults";
import { dataReducer } from "./dataReducer";
import {
  InitialResumeDataContext,
  InitialResumeDataState,
  Status,
} from "./data.types";

export const DataContext = createContext<InitialResumeDataContext>(
  {} as InitialResumeDataContext
);

const initialResumeDataState: InitialResumeDataState = {
  value: JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2),
  sections: DEFAULT_SECTIONS,
  template: "santiago",
  customSectionTitle: "",
  selectedText: "",
  resumeId: "",
  status: {} as Status,
};

export const DataProvider = ({ children }: { children: any }) => {
  const [
    {
      value,
      sections,
      customSectionTitle,
      selectedText,
      resumeId,
      template,
      status,
    },
    dispatch,
  ] = useReducer(dataReducer, initialResumeDataState);

  // useEffect(() => {
  //   const storedSections = localStorage.getItem("resumeSections");
  //   const storedValue = localStorage.getItem("resumeData");

  //   if (storedSections) {
  //     dispatch({
  //       type: "ADD_SECTIONS",
  //       payload: JSON.parse(storedSections),
  //     });
  //   } else {
  //     // Fallback to default sections if data not found in localStorage
  //     // dispatch({
  //     //   type: "ADD_SECTIONS",
  //     //   payload: DEFAULT_SECTIONS,
  //     // });
  //     const updatedSections = {
  //       default: sections.default,
  //       extra: sections.extra,
  //     };
  //     localStorage?.setItem("resumeSections", JSON.stringify(updatedSections));
  //   }

  //   if (storedValue) {
  //     dispatch({ type: "ADD_RESUME_DATA", payload: storedValue });
  //   } else {
  //     // Fallback to default value if data not found in localStorage
  //     // dispatch({
  //     //   type: "ADD_RESUME_DATA",
  //     //   payload: JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2),
  //     // });
  //     localStorage?.setItem("resumeData", value);
  //   }
  // }, [dispatch, sections, value]);

  return (
    <DataContext.Provider
      value={{
        dispatch,
        value,
        status,
        template,
        sections,
        customSectionTitle,
        selectedText,
        resumeId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext<InitialResumeDataContext>(DataContext);
};
