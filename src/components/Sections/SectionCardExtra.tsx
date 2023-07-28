import { Box } from "@chakra-ui/react";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";
import { useData } from "../Edit/DataProvider";
import { motion } from "framer-motion";

type SectionCardExtraProps = {
  section: string;
  index: number;
};

export const SectionCardExtra = ({ section, index }: SectionCardExtraProps) => {
  const { dispatch } = useData();

  return (
    <motion.div
      key={index}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(event) => {
        dispatch({
          type: "ADD_SECTION",
          payload: (event.target as HTMLDivElement).innerText,
        });
      }}
    >
      <Box
        boxShadow={"md"}
        p={"0.5rem 0.8rem"}
        m={"0.8rem"}
        cursor={"pointer"}
        fontSize={"sm"}
        borderRadius={"0.3rem"}
      >
        {dashCaseToTitleCase(section)}
      </Box>
    </motion.div>
  );
};
