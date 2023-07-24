import { createContext, useContext, useReducer } from "react";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";
import { DEFAULT_SECTIONS } from "../../utils/defaults";
import { dataReducer } from "./dataReducer";
import {
  InitialResumeDataContext,
  InitialResumeDataState,
  Status,
} from "./data.types";

export const DataContext = createContext<any>({});

const initialResumeDataState: InitialResumeDataState = {
  value: JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2),
  sections: DEFAULT_SECTIONS,
  template: "",
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
