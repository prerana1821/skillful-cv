import { TextListI, TitleListI } from "../../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const LondonSkills = ({ data }: { data: TitleListI }) => {
  return (
    <Box py='4'>
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
        <Flex gap={"1rem"}>
          {data?.list?.map((item: TextListI, index: number) => {
            return (
              <Text
                key={index}
                fontSize={"xs"}
                fontFamily={"math"}
                fontWeight={"bold"}
              >
                {item.name}
              </Text>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
