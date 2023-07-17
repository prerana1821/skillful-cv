"use client";

import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 4, md: 8 }}
          py={{ base: 20, md: 32 }}
        >
          <Heading
            as='h1'
            fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
            lineHeight={"110%"}
          >
            The easiest way to create <br />
            <Text as={"span"} color={"#F50057"} textTransform={"uppercase"}>
              Resume
            </Text>
          </Heading>
          <Text
            color={"gray.500"}
            fontSize={"lg"}
            margin={"auto"}
            textAlign={"center"}
          >
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
                fontSize='md'
                p='1rem 3rem'
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
