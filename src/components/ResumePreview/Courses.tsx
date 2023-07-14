import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";

const Courses = ({ data }: { data: any }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' size='md' textTransform={"uppercase"}>
        {data?.title}
      </Heading>
      {data?.list?.map((company: any, index: number) => {
        return (
          <Stack key={index} my='2'>
            <Flex gap='2rem' my='1rem'>
              <Heading as='h5' size='sm' textTransform={"uppercase"}>
                {company["start-date"]} - {company["end-date"]}
              </Heading>
              <Flex flexDir={"column"}>
                <Flex
                  justifyContent={"space-between"}
                  gap={"0.5rem"}
                  alignItems={"center"}
                >
                  <Heading as='h5' size='sm' textTransform={"uppercase"}>
                    {company["course"]}, {company["institution"]}
                  </Heading>
                  <Link href={company["certificate-link"]} target='_blank'>
                    <TbExternalLink fontSize={"lg"} />
                  </Link>
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
