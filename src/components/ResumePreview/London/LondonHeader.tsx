import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { PersonalDetailsI } from "../../../types/interfaces";

export const LondonHeader = ({ data }: { data: PersonalDetailsI }) => {
  const city = data?.city;
  const country = data?.country;
  const phoneNumber = data?.["phone-number"];
  const email = data?.email;

  const addressParts = [city, country];
  const filteredAddressParts = addressParts.filter(Boolean);

  const displayAddress = filteredAddressParts.join(", ");

  return (
    <Box borderBottom={"3px double #ccc"}>
      <Stack textAlign={"center"}>
        <Heading
          as='h1'
          fontSize='3xl'
          textTransform={"uppercase"}
          fontFamily={"math"}
          letterSpacing={"2px"}
        >
          {data?.["first-name"]} {data?.["last-name"]}
        </Heading>
        <Heading
          as='h2'
          fontSize='md'
          fontWeight='medium'
          fontFamily={"math"}
          letterSpacing={"2px"}
        >
          {data?.["job-title"]}
        </Heading>
        <Heading
          as='h3'
          fontSize='sm'
          fontWeight='medium'
          fontFamily={"math"}
          letterSpacing={"2px"}
        >
          {displayAddress}
        </Heading>
      </Stack>
      <Center
        display={"flex"}
        justifyContent={"space-between"}
        fontFamily={"math"}
        letterSpacing={"2px"}
      >
        <Text fontSize={"xs"} my='2'>
          {phoneNumber}
        </Text>
        <Text fontSize={"xs"} my='2'>
          {email}
        </Text>
      </Center>
    </Box>
  );
};
