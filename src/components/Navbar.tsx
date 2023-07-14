"use client";

import { Box, Flex, Button, Stack, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

export default function Navbar({ styles }: { styles?: CSSProperties }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} style={styles}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box p={"1rem"}>
            <Link href='/'>
              <Image
                src='/image/logo.png'
                alt='skillful-cv logo'
                width={"60"}
                height={"60"}
              />
            </Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
