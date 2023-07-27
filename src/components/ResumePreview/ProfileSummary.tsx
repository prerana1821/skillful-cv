import { TitleDescI } from "../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const ProfileSummary = ({ data }: { data: TitleDescI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex
        flexDir={{ md: "row" }}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        alignItems={{ md: "flex-start" }}
        gap={{ base: "6rem", md: "5rem" }}
      >
        <Heading as='h4' fontSize='md' textTransform='uppercase'>
          {data?.title}
        </Heading>
        <Text fontSize='xs'>{data?.description}</Text>
      </Flex>
    </Box>
  );
};
