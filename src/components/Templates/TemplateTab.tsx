import { IconType } from "react-icons/lib";

import { Tab, Text } from "@chakra-ui/react";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";

type TemplateTabProps = {
  typeIcon: IconType;
  labelText: string;
  orientation?: "vertical" | "horizontal";
};

export const TemplateTab = ({
  typeIcon,
  labelText,
  orientation = "horizontal",
}: TemplateTabProps) => {
  return (
    <Tab
      p={orientation === "vertical" ? "0.2rem" : "0.5rem 1rem"}
      display='flex'
      gap={orientation === "vertical" ? "0.3rem" : "1rem"}
      m='0.4rem'
    >
      {typeIcon({ fontSize: orientation === "vertical" ? "1.2rem" : "2rem" })}
      <Text fontSize={orientation === "vertical" ? "md" : "lg"}>
        {dashCaseToTitleCase(labelText)}
      </Text>
    </Tab>
  );
};
