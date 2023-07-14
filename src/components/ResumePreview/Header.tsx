import { Box, Center, Heading, Text } from "@chakra-ui/react";

const Header = ({ value }: any) => {
  return (
    <Box borderBottom={"2px solid #ccc"} my='2'>
      <Center>
        <Heading as='h1' size='xl'>
          {value?.["personal-details"]?.["first-name"]}{" "}
          {value?.["personal-details"]?.["last-name"]},{" "}
          {value?.["personal-details"]?.["job-title"]}
        </Heading>
      </Center>
      <Center>
        <Text fontSize={"md"} my='2'>
          {value?.["personal-details"]?.city},{" "}
          {value?.["personal-details"]?.country},{" "}
          {value?.["personal-details"]?.["phone-number"]},{" "}
          {value?.["personal-details"]?.email}
        </Text>
      </Center>
    </Box>
  );
};

export default Header;
