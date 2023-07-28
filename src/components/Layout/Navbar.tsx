import {
  Box,
  Flex,
  Button,
  Stack,
  Image,
  ButtonGroup,
  IconButton,
  Portal,
  useColorModeValue,
  Menu,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { CSSProperties, ReactNode } from "react";
import { HiOutlineLink, HiQrcode, HiTemplate } from "react-icons/hi";
import { useData } from "../Edit/DataProvider";
import { updateResumeDetails } from "../../services/updateResumeDetails";
import GitHubButton from "react-github-btn";

type NavbarProps = {
  styles?: CSSProperties;
  downloadComp?: ReactNode;
  shareQRCodeOnOpen?: () => void;
  shareLinkOnOpen?: () => void;
  selectTemplateOnOpen?: () => void;
};

export default function Navbar({
  styles,
  downloadComp,
  shareLinkOnOpen,
  shareQRCodeOnOpen,
  selectTemplateOnOpen,
}: NavbarProps) {
  const { value, dispatch, template, status } = useData();

  const hoverBgColor = useColorModeValue("#edeff7", "#1a202c");

  return (
    <>
      <Box px={4} maxW={"8xl"} boxShadow={styles?.boxShadow} m='auto'>
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
                            {status.loading ? (
                              <Image
                                src='/loading.gif'
                                alt='Loading...'
                                m='auto'
                                width={"50px"}
                              />
                            ) : (
                              <>
                                <MenuItem
                                  icon={<HiOutlineLink />}
                                  borderRadius={"md"}
                                  _hover={{
                                    backgroundColor: hoverBgColor,
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
                                    backgroundColor: hoverBgColor,
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
                                </MenuItem>{" "}
                              </>
                            )}
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </ButtonGroup>
                </Menu>
              )}
              <ButtonGroup>
                <GitHubButton
                  href='https://github.com/prerana1821/skillful-cv'
                  data-color-scheme='no-preference: light; light: light; dark: dark;'
                  data-icon='octicon-star'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Star prerana1821/skillful-cv on GitHub'
                >
                  Star
                </GitHubButton>
                &nbsp;&nbsp;&nbsp;
                <GitHubButton
                  href='https://github.com/prerana1821'
                  data-color-scheme='no-preference: light; light: light; dark: dark;'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Follow @prerana1821 on GitHub'
                >
                  Follow
                </GitHubButton>
              </ButtonGroup>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
