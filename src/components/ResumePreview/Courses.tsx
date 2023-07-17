import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { TbExternalLink } from "react-icons/tb";
import { Course } from "../../types/interfaces";

interface CoursesProps {
  data?: {
    title?: string;
    list?: Course[];
  };
}

const Courses = ({ data }: CoursesProps) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' fontSize='md' textTransform={"uppercase"}>
        {data?.title}
      </Heading>
      {data?.list?.map((company: Course, index: number) => {
        return (
          <Stack key={index} my='2'>
            <Flex my='0.3rem'>
              <Heading
                as='h5'
                fontSize='xs'
                fontWeight={"semibold"}
                textTransform='uppercase'
                width={{ base: "20%", md: "22%" }}
              >
                {company["start-date"]} - {company["end-date"]}
              </Heading>
              <Flex flexDir={"column"} width={{ base: "78%" }}>
                <Flex
                  justifyContent={"flex-start"}
                  gap={"0.5rem"}
                  alignItems={"center"}
                >
                  <Heading as='h5' fontSize='xs' textTransform={"uppercase"}>
                    {company["course"]}, {company["institution"]}
                  </Heading>
                  <a
                    href={company?.["certificate-link"] || ""}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <TbExternalLink fontSize={"lg"} />
                  </a>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        );
      })}
    </Box>
  );
};

export default Courses;
