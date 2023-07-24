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
import ShortUniqueId from "short-unique-id";
import axios from "axios";
import { useData } from "../Edit/DataProvider";

const API_URL = process.env.REACT_APP_API_BASE_URL;

type NavbarProps = {
  styles?: CSSProperties;
  downloadComp?: any;
  shareLinkOnOpen?: () => void;
  showColorMode?: boolean;
};

export default function Navbar({
  styles,
  downloadComp,
  shareLinkOnOpen,
  showColorMode,
}: NavbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const { value, dispatch } = useData();

  const shareResume = async () => {
    const uid = new ShortUniqueId({ length: 10 });
    const uniqueId = uid();
    const resumeJSON = JSON.parse(value);

    try {
      const response = await axios.post(`${API_URL}resumes`, {
        uniqueId,
        email: resumeJSON["personal-details"].email,
        resumeValue: value,
      });
      if (response.status === 200) {
        const resumeId = response.data.resumeId;
        dispatch({ type: "ADD_RESUME_ID", payload: resumeId });
        shareLinkOnOpen && shareLinkOnOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box px={4} boxShadow={styles?.boxShadow}>
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
              {downloadComp && <Button onClick={shareResume}>Share</Button>}
              {downloadComp}
              {showColorMode && (
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
