import axios from "axios";
import ShortUniqueId from "short-unique-id";
import { DataReducerAction } from "../components/Edit/data.types";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_BASE_URL;

type UpdateResumeDetailsProps = {
  value: string;
  template: string;
  dispatch: (action: DataReducerAction) => void;
  onOpenModal?: () => void;
};

export const updateResumeDetails = async ({
  value,
  template,
  dispatch,
  onOpenModal,
}: UpdateResumeDetailsProps) => {
  const uid = new ShortUniqueId({ length: 10 });
  const uniqueId = uid();
  const resumeJSON = JSON.parse(value);

  try {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        loading: "Loading resume data...",
      },
    });

    const response = await axios.post(`${API_URL}resumes`, {
      uniqueId,
      email: resumeJSON["personal-details"].email,
      template,
      resumeValue: value,
    });
    if (response.status === 200) {
      const resumeId = response.data.resumeId;
      dispatch({ type: "ADD_RESUME_ID", payload: resumeId });
      onOpenModal && onOpenModal();
    }
  } catch (error) {
    toast.error("An unexpected error occurred. Please try again later.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.error(error);
  } finally {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        loading: "",
      },
    });
  }
};
