import { ListI, SectionWithListI } from "@/types/interfaces";
import { Box, Flex, Heading, Stack, Text, border } from "@chakra-ui/react";

const Education = ({ data }: { data: SectionWithListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' fontSize='md' textTransform='uppercase'>
        {data?.title}
      </Heading>
      {/* {data?.list?.map((item: ListI, index: number) => (
        <Stack key={index} my='2'>
          <Flex gap='3rem'>
            <Heading
              as='h5'
              fontSize='sm'
              textTransform='uppercase'
              width={"50%"}
            >
              {item["start-date"]} - {item["end-date"]}
            </Heading>
            <Flex flexDir='column'>
              <Flex justifyContent='space-between'>
                <Heading as='h5' fontSize='sm' textTransform={"uppercase"}>
                  {item["degree"]}, {item["institution"]}
                </Heading>
                <Heading as='h5' size='sm' textTransform='uppercase'>
                  {item["city"]}
                </Heading>
              </Flex>
              <Text p='0.5rem' fontSize='xs'>
                {item.description}
              </Text>
            </Flex>
          </Flex>
        </Stack>
      ))} */}
      {data?.list?.map((item: ListI, index: number) => (
        <Stack key={index} mt='3'>
          <Flex flexDir={{ md: "row" }} alignItems='flex-start'>
            <Heading
              as='h5'
              fontSize='xs'
              fontWeight={"semibold"}
              textTransform='uppercase'
              width={{ base: "35%", md: "50%" }}
            >
              {item["start-date"]} - {item["end-date"]}
            </Heading>
            <Flex flexDir='column'>
              <Flex justifyContent='space-between'>
                <Heading as='h5' fontSize='xs' textTransform='uppercase'>
                  {item["degree"]}, {item["institution"]}
                </Heading>
                <Heading as='h5' fontSize='xs' textTransform='uppercase'>
                  {item["city"]}
                </Heading>
              </Flex>
              <Text p='0.2rem 0.3rem' fontSize='xs'>
                {item.description}
              </Text>
            </Flex>
          </Flex>
        </Stack>
      ))}
    </Box>
  );
};

export default Education;
