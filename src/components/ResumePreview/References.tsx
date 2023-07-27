import { ListI, SectionWithListI } from "../../types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const References = ({ data }: { data: SectionWithListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"}>
        <Heading
          as='h4'
          fontSize='md'
          textTransform={"uppercase"}
          width={{ base: "20%", md: "22%" }}
        >
          {data?.title}
        </Heading>
        <Flex gap='1rem' flexDir={"column"} width={{ base: "80%", md: "78%" }}>
          {data?.list?.map((item: ListI, index: number) => {
            return (
              <Box key={index}>
                <Heading
                  as='h5'
                  fontSize='xs'
                  textTransform='capitalize'
                  mb='0.5rem'
                >
                  {item["referent's-full-name"]}
                  <Text as='span' textTransform='lowercase'>
                    {" "}
                    from{" "}
                  </Text>
                  {item["company"]}
                </Heading>
                <Text fontSize='xs'>
                  {item["email"]} | {item["phone-number"]}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
