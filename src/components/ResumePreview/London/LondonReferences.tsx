import { PiDiamondsFourFill } from "react-icons/pi";
import { ListI, SectionWithListI } from "../../../types/interfaces";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";

export const LondonReferences = ({ data }: { data: SectionWithListI }) => {
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

      {data?.list?.map((item: ListI, index: number) => {
        return (
          <Stack key={index} mt='6'>
            <Flex
              flexDir={{ md: "row" }}
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex alignItems={"center"} gap={"0.3rem"}>
                <PiDiamondsFourFill fontSize={"larger"} />
                <Heading as='h5' fontSize='sm' textTransform='uppercase'>
                  {item["referent's-full-name"]}
                </Heading>
              </Flex>

              <Heading
                as='h5'
                fontSize='sm'
                textTransform='uppercase'
                fontFamily={"math"}
              >
                {item["phone-number"]}
              </Heading>
            </Flex>
            <Flex
              flexDir={{ md: "row" }}
              alignItems='center'
              justifyContent='space-between'
            >
              <Heading
                as='h5'
                fontSize='xs'
                fontWeight={"normal"}
                fontStyle={"italic"}
              >
                {item["company"]}
              </Heading>
              <Heading
                as='h5'
                fontSize='xs'
                fontFamily={"math"}
                fontWeight={"normal"}
              >
                {item["email"]}
              </Heading>
            </Flex>
          </Stack>
        );
      })}
    </Box>
  );
};
