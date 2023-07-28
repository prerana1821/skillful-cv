import { PiDiamondsFourFill } from "react-icons/pi";
import { ListI, SectionWithListI } from "../../../types/interfaces";
import {
  Box,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Stack,
} from "@chakra-ui/react";

export const LondonInternships = ({ data }: { data: SectionWithListI }) => {
  return (
    <Box py='2'>
      <Heading
        as='h4'
        fontSize='md'
        textTransform={"uppercase"}
        bgColor={"#F2F2F2"}
        py='0.3rem'
        width={"100%"}
        textAlign={"center"}
        fontFamily={"math"}
        letterSpacing={"2px"}
      >
        {data?.title}
      </Heading>
      {data?.list?.map((item: ListI, index: number) => (
        <Stack key={index} mt='6' gap={"0"}>
          <Flex
            flexDir={{ md: "row" }}
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex alignItems={"center"} gap={"0.3rem"}>
              <PiDiamondsFourFill fontSize={"larger"} />
              <Heading as='h5' fontSize='sm' textTransform='uppercase'>
                {item["title"]}, {item["employer"]}
              </Heading>
            </Flex>

            <Heading
              as='h5'
              fontSize='sm'
              textTransform='uppercase'
              fontFamily={"math"}
            >
              {item["start-date"]} -{item["end-date"]}
            </Heading>
          </Flex>
          <Flex
            flexDir={{ md: "row" }}
            alignItems='center'
            justifyContent='right'
          >
            <Heading
              as='h5'
              fontSize='xs'
              fontFamily={"math"}
              fontWeight={"normal"}
            >
              {item["city"]}
            </Heading>
          </Flex>
          <UnorderedList p='0.3rem'>
            {item?.descriptionList?.map((value: string, index: number) => (
              <ListItem key={index} fontSize='xs' fontFamily={"math"}>
                {value}
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      ))}
    </Box>
  );
};
