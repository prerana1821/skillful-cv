import { Tab, Text } from "@chakra-ui/react";
import { createElement } from "react";

export const TemplateTypeTab = ({
  icon,
  label,
  fontSize,
  orientation,
}: {
  orientation?: "vertical" | "horizontal";
  icon: any;
  label: string;
  fontSize: string;
}) => {
  return (
    <Tab
      p={orientation === "vertical" ? "0.2rem" : "0.5rem 1rem"}
      display={"flex"}
      gap={orientation === "vertical" ? "0.3rem" : "1rem"}
      m='0.4rem'
    >
      {icon && createElement(icon, { fontSize })}
      <Text fontSize={orientation === "vertical" ? "md" : "lg"}>{label}</Text>
    </Tab>
  );
};
