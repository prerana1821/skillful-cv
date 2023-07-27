import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  TabIndicator,
  Text,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PiRainbowCloud, PiShootingStarLight } from "react-icons/pi";
import { LiaHandPeace } from "react-icons/lia";
import { MdLaptopMac } from "react-icons/md";
import { CSSProperties, useState } from "react";
import { useData } from "../Edit/DataProvider";
import { TEMPLATE_TYPES } from "../../utils/defaults";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { updateResumeDetails } from "../../services/updateResumeDetails";
import { motion } from "framer-motion";

interface Template {
  type: string;
  styles: CSSProperties;
  avaliable: boolean;
  component: any;
}

const Templates = ({
  orientation,
  onModalClose,
}: {
  orientation?: "vertical" | "horizontal";
  onModalClose?: () => void;
}) => {
  const navigate = useNavigate();
  const { dispatch, value } = useData();

  const templatesByType: {
    [key: string]: Array<{
      templateName: string;
      typeIcon: IconType;
      template: Template;
    }>;
  } = Object.entries(TEMPLATE_TYPES).reduce((acc, [templateName, template]) => {
    const { type, typeIcon, avaliable } = template;
    if (!(acc as any)[type]) {
      (acc as any)[type] = [];
    }
    (acc as any)[type].push({ templateName, template, typeIcon, avaliable });
    return acc;
  }, {});

  const [isHovering, setIsHovering] = useState<string | null>(null);

  const handleMouseEnter = (templateName: string) => {
    setIsHovering(templateName);
  };

  const handleMouseLeave = () => {
    setIsHovering(null);
  };

  return (
    <Box>
      {orientation !== "vertical" && (
        <Center>
          <Heading as='h3' size='xl' my='2rem'>
            Templates
          </Heading>
        </Center>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Tabs
          orientation={orientation}
          align='center'
          defaultIndex={0}
          position='relative'
          variant='unstyled'
        >
          <TabList
            alignItems={orientation === "vertical" ? "flex-start" : "initial"}
            justifyContent={
              orientation === "vertical" ? "flex-start" : "center"
            }
          >
            <Tab
              p={orientation === "vertical" ? "0.2rem" : "0.5rem 1rem"}
              display={"flex"}
              gap={orientation === "vertical" ? "0.3rem" : "1rem"}
              m='0.4rem'
            >
              <PiRainbowCloud
                fontSize={orientation === "vertical" ? "1.2rem" : "2rem"}
              />
              <Text fontSize={orientation === "vertical" ? "md" : "lg"}>
                Simple
              </Text>
            </Tab>
            <Tab
              p={orientation === "vertical" ? "0.2rem" : "0.5rem 1rem"}
              display={"flex"}
              gap={orientation === "vertical" ? "0.3rem" : "1rem"}
              m='0.4rem'
            >
              <PiShootingStarLight
                fontSize={orientation === "vertical" ? "1.2rem" : "2rem"}
              />
              <Text fontSize={orientation === "vertical" ? "md" : "lg"}>
                {" "}
                Creative
              </Text>
            </Tab>
            <Tab
              p={orientation === "vertical" ? "0.2rem" : "0.5rem 1rem"}
              display={"flex"}
              gap={orientation === "vertical" ? "0.3rem" : "1rem"}
              m='0.4rem'
            >
              <LiaHandPeace
                fontSize={orientation === "vertical" ? "1.2rem" : "2rem"}
              />
              <Text fontSize={orientation === "vertical" ? "md" : "lg"}>
                Modern
              </Text>
            </Tab>
            <Tab
              p={orientation === "vertical" ? "0.2rem" : "0.5rem 1rem"}
              display={"flex"}
              gap={orientation === "vertical" ? "0.3rem" : "1rem"}
              m='0.4rem'
            >
              <MdLaptopMac
                fontSize={orientation === "vertical" ? "1.2rem" : "2rem"}
              />
              <Text fontSize={orientation === "vertical" ? "md" : "lg"}>
                Professional
              </Text>
            </Tab>
          </TabList>
          <TabIndicator
            mt='-1.5px'
            height='2px'
            bg='#F50057'
            borderRadius='1px'
          />
          <TabPanels>
            <TabPanels>
              {Object.entries(templatesByType).map(([type, typeTemplates]) => (
                <TabPanel key={type}>
                  <Flex
                    my={orientation === "vertical" ? "0" : "1rem"}
                    justifyContent={"center"}
                    gap='3rem'
                  >
                    {typeTemplates.map(({ templateName, template }) => (
                      <Box
                        key={templateName}
                        onClick={() => {
                          if (
                            orientation === "vertical" &&
                            template.avaliable
                          ) {
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
                            filter:
                              orientation === "vertical"
                                ? "blur(0px)"
                                : "blur(0.5px)",
                          }}
                          borderRadius={"md"}
                        />
                        <Heading as='h5' size='sm' my='1rem'>
                          {dashCaseToTitleCase(templateName)}
                        </Heading>
                        {isHovering === templateName &&
                          orientation !== "vertical" && (
                            <Button
                              position='absolute'
                              bottom='1rem'
                              left='50%'
                              top='40%'
                              transform='translateX(-50%)'
                              variant='solid'
                              backgroundColor={
                                template.avaliable ? "#f50057" : "gray"
                              }
                              color='#fff'
                              _hover={{
                                backgroundColor: template.avaliable
                                  ? "none"
                                  : "gray",
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
                              {template.avaliable
                                ? "Use This Template"
                                : "Coming Soon ..."}
                            </Button>
                          )}
                      </Box>
                    ))}
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          </TabPanels>
        </Tabs>
      </motion.div>
    </Box>
  );
};

export default Templates;
