import { Box, Flex, Button, Stack, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CSSProperties } from "react";

export default function Navbar({ styles }: { styles?: CSSProperties }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} style={styles}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box p={"1rem"}>
            {/* <Link href='/'> */}
            <img
              src='/image/logo.png'
              alt='skillful-cv logo'
              width={"40"}
              height={"40"}
            />
            {/* </Link> */}
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                onClick={toggleColorMode}
                px={"0 0.7rem"}
                height={8}
                minW={8}
              >
                {colorMode === "light" ? (
                  <MoonIcon width={"0.8em"} height={"0.8em"} />
                ) : (
                  <SunIcon width={"0.8em"} height={"0.8em"} />
                )}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
