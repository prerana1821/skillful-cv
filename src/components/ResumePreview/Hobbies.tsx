import { SectionWithListTextI } from "@/types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Hobbies = ({ data }: { data: SectionWithListTextI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap={"7rem"}>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {data?.title}
        </Heading>
        <Flex gap='1rem'>
          {data?.list?.map((item: string, index: number) => {
            return <Text key={index}>{item}</Text>;
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Hobbies;
