import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ReactNode } from "react";
import { IoIosGlobe } from "react-icons/io";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"8xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        color='#fff'
      >
        <Text fontSize={"sm"}>© 2023 | precodes. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Twitter"}
            href={"https://twitter.com/precodes18"}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"LinkedIn"}
            href={"https://linkedin.com/in/prerana-nawar"}
          >
            <FaLinkedinIn />
          </SocialButton>
          <SocialButton label={"Website"} href={"https://precodes.netlify.app"}>
            <IoIosGlobe />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
