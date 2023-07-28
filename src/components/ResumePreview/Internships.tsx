import { ListI, SectionWithListI } from "../../types/interfaces";
import {
  Box,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Stack,
} from "@chakra-ui/react";

export const Internships = ({ data }: { data: SectionWithListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' fontSize='md' textTransform='uppercase'>
        {data?.title}
      </Heading>
      {data?.list?.map((item: ListI, index: number) => (
        <Stack key={index} my='2'>
          <Flex>
            <Heading
              as='h5'
              fontSize='xs'
              fontWeight={"semibold"}
              textTransform='uppercase'
              width={{ base: "20%", md: "21%" }}
            >
              {item["start-date"]} - {item["end-date"]}
            </Heading>
            <Flex flexDir='column' width={{ base: "80%" }}>
              <Flex justifyContent='space-between'>
                <Heading as='h5' fontSize='xs' textTransform='uppercase'>
                  {item["title"]}, {item["employer"]}
                </Heading>

                <Heading as='h5' fontSize='xs' textTransform='uppercase'>
                  {item["city"]}
                </Heading>
              </Flex>
              <UnorderedList p='0.5rem'>
                {item?.descriptionList?.map((value: string, index: number) => (
                  <ListItem key={index} fontSize='xs'>
                    {value}
                  </ListItem>
                ))}
              </UnorderedList>
            </Flex>
          </Flex>
        </Stack>
      ))}
    </Box>
  );
};
