"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 4, md: 8 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            as='h1'
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            The easiest way to create <br />
            <Text as={"span"} color={"#F50057"} textTransform={"uppercase"}>
              Resume
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={"xl"}>
            Our simple editor allows you to quickly add and customize all the
            sections you need for your career.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link href={"/editor"}>
              <Button
                bg={"#F50057"}
                p='1.7rem 5rem'
                fontSize='xl'
                color='white'
                _hover={{
                  bg: "#F50057",
                }}
              >
                Get Started
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
