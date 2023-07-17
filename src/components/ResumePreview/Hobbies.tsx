import { SectionWithListTextI } from "../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Hobbies = ({ data }: { data: SectionWithListTextI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap={"0.9rem"}>
        <Heading
          as='h4'
          fontSize='md'
          textTransform={"uppercase"}
          width={{ base: "20%" }}
        >
          {data?.title}
        </Heading>
        <Flex gap='1rem' width={{ base: "80%" }}>
          {data?.list?.map((item: string, index: number) => {
            return (
              <Text key={index} fontSize={"xs"}>
                {item}
              </Text>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Hobbies;
