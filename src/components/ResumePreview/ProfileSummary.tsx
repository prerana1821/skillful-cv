import { TitleDescI } from "@/types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const ProfileSummary = ({ data }: { data: TitleDescI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap='8rem'>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {data?.title}
        </Heading>
        <Text> {data?.description}</Text>
      </Flex>
    </Box>
  );
};

export default ProfileSummary;
