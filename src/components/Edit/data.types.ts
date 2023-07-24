export type InitialResumeDataContext = {
  dispatch: (action: any) => void;
  value: any;
  status: {
    loading: string;
    success: string;
    error: string;
  };
  sections: {
    default: string[];
    extra: string[];
  };
  customSectionTitle: "";
  selectedText: "";
  resumeId: "";
};
