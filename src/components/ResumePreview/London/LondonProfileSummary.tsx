import { TitleDescI } from "../../../types/interfaces";
import { Box, Heading, Text } from "@chakra-ui/react";

export const LondonProfileSummary = ({ data }: { data: TitleDescI }) => {
  return (
    <Box py='2 ' letterSpacing={"2px"}>
      <Heading
        as='h4'
        fontSize='md'
        textTransform={"uppercase"}
        bgColor={"#F2F2F2"}
        py='0.3rem'
        fontFamily={"math"}
        width={"100%"}
        textAlign={"center"}
      >
        {data?.title}
      </Heading>
      <Text fontSize='xs' textAlign='center' fontFamily={"math"}>
        {data?.description}
      </Text>
    </Box>
  );
};
