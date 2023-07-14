import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const References = ({ data }: { data: any }) => {
  return (
    <Box py='4' borderBottom={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap='5rem'>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {data?.title}
        </Heading>
        <Flex gap='1rem' flexDir={"column"}>
          {data?.list.map((item: any, index: number) => {
            return (
              <Box key={index}>
                <Heading
                  as='h5'
                  size='sm'
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
                <Text>
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

export default References;
