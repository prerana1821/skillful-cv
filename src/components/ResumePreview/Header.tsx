import { PersonalDetailsI } from "../../types/interfaces";
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { useData } from "../Edit/DataProvider";

const Header = ({ data }: { data: PersonalDetailsI }) => {
  const { template } = useData();
  console.log({ template });

  const city = data?.city;
  const country = data?.country;
  const phoneNumber = data?.["phone-number"];
  const email = data?.email;

  const addressParts = [city, country];
  const filteredAddressParts = addressParts.filter(Boolean);

  const displayAddress = filteredAddressParts.join(", ");

  return (
    <Box my='2'>
      {template === "london" ? (
        <>
          <Stack textAlign={"center"}>
            <Heading as='h1' fontSize='3xl' textTransform={"uppercase"}>
              {data?.["first-name"]} {data?.["last-name"]}
            </Heading>
            <Heading as='h2' fontSize='md' fontWeight='medium'>
              {data?.["job-title"]}
            </Heading>
            <Heading as='h3' fontSize='sm' fontWeight='medium'>
              {displayAddress}
            </Heading>
          </Stack>
          <Center display={"flex"} justifyContent={"space-between"}>
            <Text fontSize={"xs"} my='2'>
              {phoneNumber}
            </Text>
            <Text fontSize={"xs"} my='2'>
              {email}
            </Text>
          </Center>
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Header;
