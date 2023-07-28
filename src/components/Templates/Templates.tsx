import { Box, Center, Flex, Heading, TabIndicator } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { TEMPLATE_TYPES } from "../../utils/defaults";
import { motion } from "framer-motion";
import { TemplateTab } from "./TemplateTab";
import { TemplateBox } from "./TemplateBox";
import { TemplatesByType } from "./types";

type TemplatesProps = {
  orientation?: "vertical" | "horizontal";
  onModalClose?: () => void;
};

const Templates = ({ orientation, onModalClose }: TemplatesProps) => {
  const templatesByType: {
    [key: string]: TemplatesByType[];
  } = Object.entries(TEMPLATE_TYPES).reduce((acc, [templateName, template]) => {
    const { type, typeIcon, avaliable } = template;
    if (!(acc as any)[type]) {
      (acc as any)[type] = [];
    }
    (acc as any)[type].push({ templateName, template, typeIcon, avaliable });
    return acc;
  }, {});

  return (
    <Box color='#fff'>
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
            {Object.entries(templatesByType).map(([type, typeTemplates]) => (
              <TemplateTab
                key={type}
                typeIcon={typeTemplates[0].typeIcon}
                labelText={type}
                orientation={orientation}
              />
            ))}
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
                      <TemplateBox
                        templateName={templateName}
                        orientation={orientation}
                        template={template}
                        onModalClose={onModalClose}
                      />
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
