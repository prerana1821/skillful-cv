import { PersonalDetailsI } from "@/types/interfaces";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

const Header = ({ data }: { data: PersonalDetailsI }) => {
  return (
    <Box my='2'>
      <Center>
        <Heading as='h1' fontSize='2xl'>
          {data?.["first-name"]} {data?.["last-name"]}, {data?.["job-title"]}
        </Heading>
      </Center>
      <Center>
        <Text fontSize={"xs"} my='2'>
          {data?.city}, {data?.country}, {data?.["phone-number"]}, {data?.email}
        </Text>
      </Center>
    </Box>
  );
};

export default Header;
