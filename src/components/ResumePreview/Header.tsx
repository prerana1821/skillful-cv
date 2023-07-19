import { PersonalDetailsI } from "../../types/interfaces";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

const Header = ({ data }: { data: PersonalDetailsI }) => {
  const city = data?.city;
  const country = data?.country;
  const phoneNumber = data?.["phone-number"];
  const email = data?.email;

  const addressParts = [city, country];
  const filteredAddressParts = addressParts.filter(Boolean);

  const displayAddress = filteredAddressParts.join(", ");

  return (
    <Box my='2'>
      <Center>
        <Heading as='h1' fontSize='2xl'>
          {data?.["first-name"]} {data?.["last-name"]}
          {data?.["job-title"] &&
            (data?.["first-name"] || data?.["last-name"]) &&
            ","}{" "}
          {data?.["job-title"]}
        </Heading>
      </Center>
      <Center>
        <Text fontSize={"xs"} my='2'>
          {displayAddress}
          {phoneNumber && `, ${phoneNumber}`}
          {email && `, ${email}`}
        </Text>
      </Center>
    </Box>
  );
};

export default Header;
