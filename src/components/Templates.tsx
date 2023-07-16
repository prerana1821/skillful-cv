import { Box, Center, Heading, TabIndicator, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PiShootingStarLight, PiRainbowCloud } from "react-icons/pi";
import { LiaHandPeace } from "react-icons/lia";
import { MdLaptopMac } from "react-icons/md";

const Templates = () => {
  return (
    <Box>
      <Center>
        <Heading as='h3' size='xl' my='2rem'>
          Templates
        </Heading>
      </Center>
      <Tabs
        align='center'
        defaultIndex={0}
        position='relative'
        variant='unstyled'
      >
        <TabList>
          <Tab p='0.5rem 1rem' display={"flex"} gap='1rem' m='0.4rem'>
            <PiShootingStarLight fontSize={"2rem"} />
            <Text fontSize={"lg"}> Creative</Text>
          </Tab>
          <Tab p='0.5rem 1rem' display={"flex"} gap='1rem' m='0.4rem'>
            <PiRainbowCloud fontSize={"2rem"} />
            <Text fontSize={"lg"}>Simple</Text>
          </Tab>
          <Tab p='0.5rem 1rem' display={"flex"} gap='1rem' m='0.4rem'>
            <LiaHandPeace fontSize={"2rem"} />
            <Text fontSize={"lg"}>Modern</Text>
          </Tab>
          <Tab p='0.5rem 1rem' display={"flex"} gap='1rem' m='0.4rem'>
            <MdLaptopMac fontSize={"2rem"} />
            <Text fontSize={"lg"}>Professional</Text>
          </Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          height='2px'
          bg='#F50057'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Templates;
