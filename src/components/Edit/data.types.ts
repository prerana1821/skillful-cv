export type Status = {
  loading?: string;
  success?: string;
  error?: ServerError;
};

export type ServerError = {
  errorMessage: string;
  errorCode: number;
};

export type InitialResumeDataState = {
  value: string;
  sections: {
    default: string[];
    extra: string[];
  };
  template: string;
  customSectionTitle: string;
  selectedText: string;
  resumeId: string;
  status: Status;
};

export type InitialResumeDataContext = {
  dispatch: (action: DataReducerAction) => void;
  value: any;
  status: Status;
  sections: {
    default: string[];
    extra: string[];
  };
  customSectionTitle: string;
  selectedText: string;
  resumeId: string;
  template: string;
};

export type DataReducerAction =
  | { type: "ADD_RESUME_DATA"; payload: any }
  | {
      type: "ADD_SECTIONS";
      payload: {
        default: string[];
        extra: string[];
      };
    }
  | { type: "UPDATE_SECTIONS"; payload: string[] }
  | { type: "ADD_RESUME_ID"; payload: string }
  | { type: "ADD_CUSTOM_SECTION_TITLE"; payload: string }
  | { type: "REMOVE_ADDED_SECTION"; payload: string }
  | { type: "RESET_DEFAULT_SECTION"; payload: string }
  | { type: "RESET_SECTIONS"; payload?: "" }
  | { type: "CLEAR_CUSTOM_SECTION_TITLE"; payload?: "" }
  | { type: "ADD_CUSTOM_SECTION"; payload: string }
  | { type: "ADD_SECTION"; payload: string }
  | { type: "ADD_SELECTED_TEXT"; payload: string }
  | { type: "CHANGE_STATUS"; payload: Status }
  | { type: "SET_TEMPLATE"; payload: string };
