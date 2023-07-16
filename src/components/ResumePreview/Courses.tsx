import { ListI, SectionWithListI } from "@/types/interfaces";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";

const Courses = ({ data }: { data: SectionWithListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Heading as='h4' fontSize='md' textTransform={"uppercase"}>
        {data?.title}
      </Heading>
      {data?.list?.map((company: ListI, index: number) => {
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
                  <Link
                    href={company?.["certificate-link"] || ""}
                    target='_blank'
                  >
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
