import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  Image,
  ButtonGroup,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";
import { HiOutlineLink, HiQrcode, HiTemplate } from "react-icons/hi";
import { useData } from "../Edit/DataProvider";
import { Menu, MenuItem } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { updateResumeDetails } from "../../services/updateResumeDetails";

type NavbarProps = {
  styles?: CSSProperties;
  downloadComp?: any;
  shareQRCodeOnOpen?: () => void;
  shareLinkOnOpen?: () => void;
  selectTemplateOnOpen?: () => void;
  showColorMode?: boolean;
};

export default function Navbar({
  styles,
  downloadComp,
  shareLinkOnOpen,
  shareQRCodeOnOpen,
  selectTemplateOnOpen,
  showColorMode,
}: NavbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const { value, dispatch, template } = useData();

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
              {downloadComp && (
                <Button
                  onClick={selectTemplateOnOpen}
                  display={"flex"}
                  alignItems={"center"}
                  variant={"outline"}
                  gap={"0.3rem"}
                  leftIcon={<HiTemplate fontSize='md' />}
                >
                  Change Template
                </Button>
              )}

              {downloadComp && (
                <Menu>
                  <ButtonGroup isAttached variant='outline'>
                    {downloadComp}
                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          aria-label='Add to friends'
                          icon={<ChevronDownIcon />}
                        />
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent maxW='14rem' mx='1rem'>
                          <PopoverArrow />
                          <PopoverBody>
                            <MenuItem
                              icon={<HiOutlineLink />}
                              borderRadius={"md"}
                              _hover={{
                                backgroundColor: "#edeff7",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                updateResumeDetails({
                                  value,
                                  template,
                                  onOpenModal: shareLinkOnOpen,
                                  dispatch,
                                })
                              }
                            >
                              Share a link
                            </MenuItem>
                            <MenuItem
                              borderRadius={"md"}
                              _hover={{
                                backgroundColor: "#edeff7",
                                cursor: "pointer",
                              }}
                              icon={<HiQrcode />}
                              onClick={() =>
                                updateResumeDetails({
                                  value,
                                  template,
                                  onOpenModal: shareQRCodeOnOpen,
                                  dispatch,
                                })
                              }
                            >
                              Generate QR Code
                            </MenuItem>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </ButtonGroup>
                </Menu>
              )}
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
