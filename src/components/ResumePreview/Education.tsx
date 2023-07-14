import {
  Box,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Stack,
  Text,
  border,
} from "@chakra-ui/react";

const Education = ({ data }: { data: any }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' size='md' textTransform='uppercase'>
        {data?.title}
      </Heading>
      {data?.list?.map((item: any, index: number) => (
        <Stack key={index} my='2'>
          <Flex gap='3rem'>
            <Heading as='h5' size='sm' textTransform='uppercase' width={"50%"}>
              {item["start-date"]} - {item["end-date"]}
            </Heading>
            <Flex flexDir='column'>
              <Flex justifyContent='space-between'>
                <Heading as='h5' size='sm' textTransform={"uppercase"}>
                  {item["degree"]}, {item["institution"]}
                </Heading>
                <Heading as='h5' size='sm' textTransform='uppercase'>
                  {item["city"]}
                </Heading>
              </Flex>
              <Text p='0.5rem'>{item.description}</Text>
            </Flex>
          </Flex>
        </Stack>
      ))}
    </Box>
  );
};

export default Education;
