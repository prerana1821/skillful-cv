import { useNavigate } from "react-router-dom";
import { useData } from "../Edit/DataProvider";
import { Box, Button, Heading, Image } from "@chakra-ui/react";
import { updateResumeDetails } from "../../services/updateResumeDetails";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";
import { useState } from "react";
import { Template } from "./types";

type TemplateBoxProps = {
  templateName: string;
  orientation: "horizontal" | "vertical" | undefined;
  template: Template;
  onModalClose: (() => void) | undefined;
};

export const TemplateBox = ({
  templateName,
  orientation,
  template,
  onModalClose,
}: TemplateBoxProps) => {
  const { value, dispatch } = useData();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState<string | null>(null);

  const handleMouseEnter = (templateName: string) => {
    setIsHovering(templateName);
  };

  const handleMouseLeave = () => {
    setIsHovering(null);
  };

  return (
    <Box
      key={templateName}
      onClick={() => {
        if (orientation === "vertical" && template.avaliable) {
          dispatch({
            type: "SET_TEMPLATE",
            payload: templateName,
          });
          updateResumeDetails({
            value,
            template: templateName,
            dispatch,
          });
          onModalClose && onModalClose();
        }
      }}
      position='relative'
      onMouseEnter={() => handleMouseEnter(templateName)}
      onMouseLeave={handleMouseLeave}
      cursor={"pointer"}
    >
      <Image
        src={`/assets/${templateName}.png`}
        width={orientation === "vertical" ? "400px" : "350px"}
        style={{
          filter: orientation === "vertical" ? "blur(0px)" : "blur(0.5px)",
        }}
        borderRadius={"md"}
      />
      <Heading as='h5' size='sm' my='1rem'>
        {dashCaseToTitleCase(templateName)}
      </Heading>
      {isHovering === templateName && orientation !== "vertical" && (
        <Button
          position='absolute'
          bottom='1rem'
          left='50%'
          top='40%'
          transform='translateX(-50%)'
          variant='solid'
          backgroundColor={template.avaliable ? "#f50057" : "gray"}
          color='#fff'
          _hover={{
            backgroundColor: template.avaliable ? "none" : "gray",
          }}
          onClick={() => {
            if (template.avaliable) {
              dispatch({
                type: "SET_TEMPLATE",
                payload: templateName,
              });
              navigate("/editor");
            }
          }}
          disabled={!template.avaliable}
        >
          {template.avaliable ? "Use This Template" : "Coming Soon ..."}
        </Button>
      )}
    </Box>
  );
};
