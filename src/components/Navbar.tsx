import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";

export default function Navbar({
  styles,
  downloadComp,
  shareResume,
}: {
  styles?: CSSProperties;
  downloadComp?: any;
  shareResume?: () => void;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} boxShadow={"md"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box p={"0.8rem"}>
            <Link to='/'>
              <Image
                src='/logo.png'
                alt='skillful-cv logo'
                width={"40px"}
                height={"40px"}
              />
            </Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={5} alignItems={"center"}>
              <Button onClick={shareResume}>Share</Button>
              {downloadComp}
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
