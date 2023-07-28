import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
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

export const DataProvider = ({ children }: { children: ReactNode }) => {
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

  useEffect(() => {
    const updatedSections = {
      default: sections.default,
      extra: sections.extra,
    };

    localStorage?.setItem("resumeData", value);
    localStorage?.setItem("resumeTemplate", template);
    localStorage?.setItem("resumeSections", JSON.stringify(updatedSections));
  }, [sections, value, template]);

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
