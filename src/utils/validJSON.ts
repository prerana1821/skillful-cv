import { toast } from "react-toastify";

export const validJSON = (text: string) => {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
};
