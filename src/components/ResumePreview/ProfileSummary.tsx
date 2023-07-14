import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const ProfileSummary = ({ value }: any) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap='8rem'>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {value?.["profile-summary"]?.title}
        </Heading>
        <Text> {value?.["profile-summary"]?.description}</Text>
      </Flex>
    </Box>
  );
};

export default ProfileSummary;
