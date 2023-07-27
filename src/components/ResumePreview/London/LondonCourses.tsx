import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { Course } from "../../../types/interfaces";
import { PiDiamondsFourFill } from "react-icons/pi";

interface CoursesProps {
  data?: {
    title?: string;
    list?: Course[];
  };
}

export const LondonCourses = ({ data }: CoursesProps) => {
  return (
    <Box py='4'>
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
      {data?.list?.map((company: Course, index: number) => {
        return (
          <Stack key={index} my='2'>
            <Flex
              flexDir={{ md: "row" }}
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex alignItems={"center"} gap={"0.3rem"}>
                <PiDiamondsFourFill fontSize={"larger"} />
                <Heading as='h5' fontSize='sm' textTransform='uppercase'>
                  {company["institution"]}
                </Heading>
              </Flex>

              <Heading
                as='h5'
                fontSize='sm'
                textTransform='uppercase'
                fontFamily={"math"}
              >
                {company["start-date"]} -{company["end-date"]}
              </Heading>
            </Flex>
            <Flex flexDir={{ md: "row" }} alignItems='center' gap={"0.5rem"}>
              <Heading
                as='h5'
                fontSize='xs'
                fontWeight={"normal"}
                fontStyle={"italic"}
              >
                {company["course"]}
              </Heading>
              <a
                href={company?.["certificate-link"] || ""}
                target='_blank'
                rel='noreferrer'
              >
                <TbExternalLink fontSize={"lg"} />
              </a>
            </Flex>
          </Stack>
        );
      })}
    </Box>
  );
};
