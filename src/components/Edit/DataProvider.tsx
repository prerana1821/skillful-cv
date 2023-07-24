import { createContext, useContext, useEffect, useReducer } from "react";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";
import { DEFAULT_SECTIONS } from "../../utils/defaults";
import { dataReducer } from "./dataReducer";
import { InitialResumeDataContext } from "./data.types";

export const DataContext = createContext<any>({});

export const DataProvider = ({ children }: { children: any }) => {
  const [
    { value, sections, customSectionTitle, selectedText, resumeId, status },
    dispatch,
  ] = useReducer(dataReducer, {
    value: JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2),
    sections: DEFAULT_SECTIONS,
    customSectionTitle: "",
    selectedText: "",
    resumeId: "",
    status: { loading: "", success: "", error: "" },
  });

  return (
    <DataContext.Provider
      value={{
        dispatch,
        value,
        status,
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
