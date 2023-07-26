import { SectionWithListTextI } from "../../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const LondonHobbies = ({ data }: { data: SectionWithListTextI }) => {
  return (
    <Box py='2'>
      <Flex flexDir={"column"} alignItems={"center"} gap='1rem'>
        <Heading
          as='h4'
          fontSize='md'
          textTransform={"uppercase"}
          bgColor={"#F2F2F2"}
          py='0.3rem'
          width={"100%"}
          textAlign={"center"}
          fontFamily={"math"}
          letterSpacing={"2px"}
        >
          {data?.title}
        </Heading>
        <Flex gap='1rem'>
          {data?.list?.map((item: string, index: number) => {
            return (
              <Text
                key={index}
                fontSize={"xs"}
                fontFamily={"math"}
                fontStyle={"italic"}
                fontWeight={"bold"}
              >
                {item}
              </Text>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
