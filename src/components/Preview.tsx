import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";

const Preview = ({ value }: { value: any }) => {
  return (
    <Box
      flex={{ base: "none", sm: "45%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
    >
      <Heading as='h3' size='md' mb='0.5rem'>
        Preview
      </Heading>

      <Box border={"1px solid black"} m='1rem' borderRadius={"md"} p='1rem'>
        <Box>
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
        <Divider borderBottom={"2px solid black"} my='2' />
        <Box my='4'>
          <Flex flexDir={"row"} justifyContent={"space-between"} gap='8rem'>
            <Heading as='h4' size='md' textTransform={"uppercase"}>
              {value?.["professional-summary"]?.title}
            </Heading>
            <Text> {value?.["professional-summary"]?.description}</Text>
          </Flex>
        </Box>
        <Divider borderBottom={"2px solid black"} my='2' />
        <Box my='4'>
          <Heading as='h4' size='md' textTransform={"uppercase"}>
            {value?.["professional-experience"]?.title}
          </Heading>
          {value?.["professional-experience"]?.["companyList"]?.map(
            (company: any, index: number) => {
              return (
                <Stack key={index} my='2'>
                  <Flex gap='3rem'>
                    <Heading as='h5' size='sm' textTransform={"uppercase"}>
                      {company["start-date"]} - {company["end-date"]}
                    </Heading>
                    <Flex flexDir={"column"}>
                      <Flex justifyContent={"space-between"}>
                        <Heading as='h5' size='sm' textTransform={"uppercase"}>
                          {company["job-title"]}, {company["employer"]}
                        </Heading>
                        <Heading as='h5' size='sm' textTransform={"uppercase"}>
                          {company["city"]}
                        </Heading>
                      </Flex>
                      <OrderedList p='0.5rem'>
                        {company["descriptionList"].map(
                          (value: string, index: number) => {
                            return <ListItem key={index}>{value}</ListItem>;
                          }
                        )}
                      </OrderedList>
                    </Flex>
                  </Flex>
                </Stack>
              );
            }
          )}
        </Box>
        <Divider borderBottom={"2px solid black"} my='2' />
        <Box my='4'>
          <Heading as='h4' size='md' textTransform={"uppercase"}>
            {value?.["education"]?.title}
          </Heading>
          {value?.["education"]?.["degreeList"]?.map(
            (degree: any, index: number) => {
              return (
                <Stack key={index} my='2'>
                  <Flex gap='3rem'>
                    <Heading
                      as='h5'
                      size='sm'
                      textTransform={"uppercase"}
                      width={"50%"}
                    >
                      {degree["start-date"]} - {degree["end-date"]}
                    </Heading>
                    <Flex flexDir={"column"}>
                      <Flex justifyContent={"space-between"}>
                        <Heading as='h5' size='sm' textTransform={"uppercase"}>
                          {degree["degree"]}, {degree["institution"]}
                        </Heading>
                        <Heading as='h5' size='sm' textTransform={"uppercase"}>
                          {degree["city"]}
                        </Heading>
                      </Flex>
                      <Text p='0.5rem'>{degree["description"]}</Text>
                    </Flex>
                  </Flex>
                </Stack>
              );
            }
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
