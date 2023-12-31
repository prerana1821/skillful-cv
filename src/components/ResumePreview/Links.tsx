import { TextListI, TitleListI } from "../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const Links = ({ data }: { data: TitleListI }) => {
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
          {data?.list?.map((item: TextListI, index: number) => {
            return (
              <a
                href={item?.link || ""}
                key={index}
                style={{ textDecoration: "underline" }}
              >
                <Text fontSize='xs'>{item?.label}</Text>
              </a>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
