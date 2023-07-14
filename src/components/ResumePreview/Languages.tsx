import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Languages = ({ data }: { data: any }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap={"5rem"}>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {data?.title}
        </Heading>
        <Flex gap='1rem'>
          {data?.list?.map((item: any, index: number) => {
            return <Text key={index}>{item.name}</Text>;
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Languages;
