import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  TabIndicator,
  Text,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PiShootingStarLight, PiRainbowCloud } from "react-icons/pi";
import { LiaHandPeace } from "react-icons/lia";
import { MdLaptopMac } from "react-icons/md";
import { CSSProperties } from "react";
import { useData } from "../Edit/DataProvider";
import { TEMPLATE_TYPES } from "../../utils/defaults";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";
import { useNavigate } from "react-router-dom";

interface Template {
  type: string;
  styles: CSSProperties;
}

const Templates = ({
  orientation,
}: {
  orientation?: "vertical" | "horizontal";
}) => {
  const navigate = useNavigate();
  const { dispatch } = useData();

  const templatesByType: {
    [key: string]: Array<{ templateName: string; template: Template }>;
  } = Object.entries(TEMPLATE_TYPES).reduce((acc, [templateName, template]) => {
    const { type } = template;
    if (!(acc as any)[type]) {
      (acc as any)[type] = [];
    }
    (acc as any)[type].push({ templateName, template });
    return acc;
  }, {});

  return (
    <Box>
      {orientation !== "vertical" && (
        <Center>
          <Heading as='h3' size='xl' my='2rem'>
            Templates
          </Heading>
        </Center>
      )}
      <Tabs
        orientation={orientation}
        align='center'
        defaultIndex={0}
        position='relative'
        variant='unstyled'
      >
        <TabList
          alignItems={orientation === "vertical" ? "flex-start" : "initial"}
          justifyContent={orientation === "vertical" ? "flex-start" : "center"}
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
                  // my={orientation === "vertical" ? "0" : "1rem"}
                  // gap='2rem'
                  // templateColumns={{
                  //   base: "repeat(1, 1fr)",
                  //   md: "repeat(2, 1fr)",
                  // }}
                >
                  {/* <Box
                    maxH={orientation === "vertical" ? "500px" : "auto"} // Set the maximum height for vertical scroll
                    // width={"100%"}
                    overflowY={orientation === "vertical" ? "auto" : "visible"} // Enable vertical scroll for vertical orientation
                  > */}
                  {typeTemplates.map(({ templateName, template }) => (
                    <Box
                      key={templateName}
                      onClick={() => {
                        dispatch({
                          type: "SET_TEMPLATE",
                          payload: templateName,
                        });
                        navigate("/editor");
                      }}
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
                    </Box>
                  ))}
                  {/* </Box> */}
                </Flex>
              </TabPanel>
            ))}
          </TabPanels>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Templates;
