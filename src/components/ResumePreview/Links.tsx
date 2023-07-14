import { TextListI, TitleListI } from "@/types/interfaces";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Links = ({ data }: { data: TitleListI }) => {
  return (
    <Box py='4' borderTop={"2px solid #ccc"}>
      <Flex flexDir={"row"} justifyContent={"flex-start"} gap={"9rem"}>
        <Heading as='h4' size='md' textTransform={"uppercase"}>
          {data?.title}
        </Heading>
        <Flex gap='1rem'>
          {data?.list?.map((item: TextListI, index: number) => {
            return (
              <Link
                href={item?.link || ""}
                key={index}
                style={{ textDecoration: "underline" }}
              >
                {item?.label}
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Links;
