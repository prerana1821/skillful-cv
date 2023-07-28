import { TextListI, TitleListI } from "../../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const LondonLinks = ({ data }: { data: TitleListI }) => {
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
        <Flex gap='1rem' justifyContent={"center"}>
          {data?.list?.map((item: TextListI, index: number) => {
            return (
              <a
                href={item?.link || ""}
                key={index}
                style={{ textDecoration: "underline" }}
              >
                <Text
                  fontSize='xs'
                  fontStyle={"italic"}
                  fontFamily={"math"}
                  letterSpacing={"1px"}
                >
                  {" "}
                  {item?.label}
                </Text>
              </a>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
