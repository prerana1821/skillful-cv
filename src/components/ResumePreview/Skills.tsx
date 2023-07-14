import { TextListI, TitleListI } from "@/types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Skills = ({ data }: { data: TitleListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap='8.5rem'>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {data?.title}
        </Heading>
        <Flex gap='1rem'>
          {data?.list?.map((item: TextListI, index: number) => {
            return <Text key={index}>{item.name}</Text>;
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Skills;
