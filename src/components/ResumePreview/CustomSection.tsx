import { ListI, SectionWithListI } from "@/types/interfaces";
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";

const CustomSection = ({ data }: { data: SectionWithListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' size='md' textTransform='uppercase'>
        {data?.title}
      </Heading>
      {data?.list?.map((item: ListI, index: number) => (
        <Stack key={index} my='2'>
          <Flex gap='3rem'>
            <Heading as='h5' size='sm' textTransform='uppercase'>
              {item["start-date"]} - {item["end-date"]}
            </Heading>
            <Flex flexDir='column'>
              <Flex justifyContent='space-between'>
                <Heading as='h5' size='sm' textTransform='uppercase'>
                  {item["activity-name"]}
                </Heading>

                <Heading as='h5' size='sm' textTransform='uppercase'>
                  {item["city"]}
                </Heading>
              </Flex>
              <UnorderedList p='0.5rem'>
                {item?.descriptionList?.map((value: string, index: number) => (
                  <ListItem key={index}>{value}</ListItem>
                ))}
              </UnorderedList>
            </Flex>
          </Flex>
        </Stack>
      ))}
    </Box>
  );
};

export default CustomSection;
