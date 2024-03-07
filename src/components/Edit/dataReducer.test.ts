import { initialResumeDataState } from "./DataProvider";
import { DataReducerAction, InitialResumeDataState } from "./data.types";
import { dataReducer } from "./dataReducer";
import INITIAL_DEFAULT_RESUME from "../../data/default-resume.json";

// Mock localStorage functions for testing
const mockLocalStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
};

describe("should test data reducer", () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.getItem.mockClear();
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
  });

  it("should handle ADD_RESUME_DATA action", () => {
    const action: DataReducerAction = {
      type: "ADD_RESUME_DATA",
      payload: '{"name": "John"}',
    };
    const newState = dataReducer(initialResumeDataState, action);
    expect(newState).toEqual({
      ...initialResumeDataState,
      value: '{"name": "John"}',
    });
    // Ensure localStorage is called with the expected values
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "resumeData",
      '{"name": "John"}'
    );
  });

  it("should handle ADD_SECTIONS action", () => {
    const state: InitialResumeDataState = initialResumeDataState;
    const action: DataReducerAction = {
      type: "ADD_SECTIONS",
      payload: {
        default: ["education", "experience"],
        extra: ["custom"],
      },
    };

    const newState = dataReducer(state, action);
    expect(newState.sections).toEqual({
      default: ["education", "experience"],
      extra: ["custom"],
    });
    // Ensure localStorage is called with the expected values
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "resumeSections",
      JSON.stringify({
        default: ["education", "experience"],
        extra: ["custom"],
      })
    );
  });

  it("should handle UPDATE_SECTIONS action", () => {
    const state: InitialResumeDataState = {
      ...initialResumeDataState,
      sections: {
        default: ["education", "experience", "custom"],
        extra: ["additional"],
      },
    };
    const action: DataReducerAction = {
      type: "UPDATE_SECTIONS",
      payload: ["skills", "projects"],
    };

    const newState = dataReducer(state, action);

    expect(newState.sections.default).toEqual(["skills", "projects"]);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "resumeSections",
      JSON.stringify({
        default: ["skills", "projects"],
        extra: ["additional"],
      })
    );
  });

  it("should handle ADD_RESUME_ID action", () => {
    const state: InitialResumeDataState = initialResumeDataState;

    const action: DataReducerAction = {
      type: "ADD_RESUME_ID",
      payload: "12345",
    };
    const newState = dataReducer(state, action);
    expect(newState).toEqual({
      ...state,
      resumeId: "12345",
    });
  });

  it("should handle ADD_CUSTOM_SECTION_TITLE action", () => {
    const state: InitialResumeDataState = initialResumeDataState;

    const action: DataReducerAction = {
      type: "ADD_CUSTOM_SECTION_TITLE",
      payload: "Custom Section",
    };
    const newState = dataReducer(state, action);
    expect(newState).toEqual({
      ...state,
      customSectionTitle: "Custom Section",
    });
  });

  it("should handle REMOVE_ADDED_SECTION action", () => {
    const state: InitialResumeDataState = {
      ...initialResumeDataState,
      sections: {
        default: ["education", "experience", "custom"],
        extra: [],
      },
    };
    const action: DataReducerAction = {
      type: "REMOVE_ADDED_SECTION",
      payload: "custom",
    };

    const newState = dataReducer(state, action);

    expect(newState.sections.default).toEqual(["education", "experience"]);
    expect(newState.sections.extra).toEqual(["custom"]);
  });

  it("should handle RESET_SECTIONS action", () => {
    const state: InitialResumeDataState = {
      ...initialResumeDataState,
      sections: {
        default: ["education", "experience", "custom"],
        extra: ["additional"],
      },
    };
    const action: DataReducerAction = {
      type: "RESET_SECTIONS",
    };

    const newState = dataReducer(state, action);

    expect(newState.sections).toEqual(initialResumeDataState.sections);
    expect(newState.value).toEqual(
      JSON.stringify(INITIAL_DEFAULT_RESUME, null, 2)
    );
  });

  it("should handle CLEAR_CUSTOM_SECTION_TITLE action", () => {
    const state: InitialResumeDataState = {
      ...initialResumeDataState,
      customSectionTitle: "Projects",
    };
    const action: DataReducerAction = {
      type: "CLEAR_CUSTOM_SECTION_TITLE",
    };

    const newState = dataReducer(state, action);

    expect(newState.customSectionTitle).toEqual("");
  });

  it("should handle ADD_CUSTOM_SECTION action", () => {
    const state: InitialResumeDataState = initialResumeDataState;
    const action: DataReducerAction = {
      type: "ADD_CUSTOM_SECTION",
      payload: "Projects",
    };

    const newState = dataReducer(state, action);

    expect(newState.sections.default).toContain("projects");
    expect(newState.customSectionTitle).toEqual("");
  });

  it("should handle ADD_SECTION action", () => {
    const state: InitialResumeDataState = initialResumeDataState;
    const action: DataReducerAction = {
      type: "ADD_SECTION",
      payload: "Skills",
    };

    const newState = dataReducer(state, action);

    expect(newState.sections.default).toContain("skills");
  });

  it("should handle ADD_SELECTED_TEXT action", () => {
    const state: InitialResumeDataState = initialResumeDataState;
    const action: DataReducerAction = {
      type: "ADD_SELECTED_TEXT",
      payload: "Selected text here",
    };

    const newState = dataReducer(state, action);

    expect(newState.selectedText).toEqual("Selected text here");
  });

  it("should handle CHANGE_STATUS action", () => {
    const state: InitialResumeDataState = initialResumeDataState;
    const action: DataReducerAction = {
      type: "CHANGE_STATUS",
      payload: {
        success: "Data updated successfully",
      },
    };

    const newState = dataReducer(state, action);

    expect(newState.status).toEqual({
      success: "Data updated successfully",
    });
  });

  it("should handle SET_TEMPLATE action", () => {
    const state: InitialResumeDataState = initialResumeDataState;

    const action: DataReducerAction = {
      type: "SET_TEMPLATE",
      payload: "Template 1",
    };
    const newState = dataReducer(state, action);
    expect(newState).toEqual({
      ...state,
      template: "Template 1",
    });
  });
});
