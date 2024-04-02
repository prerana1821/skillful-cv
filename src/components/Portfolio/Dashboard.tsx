import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiStar,
  FiSettings,
  FiMenu,
  FiBook,
  FiEdit3,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactNode, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../Edit/DataProvider";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/portfolio/overview" },
  { name: "About", icon: FiUser, href: "/portfolio/about" },
  { name: "Education", icon: FiBook, href: "/portfolio/education" },
  { name: "Experience", icon: FiBriefcase, href: "/portfolio/experience" },
  { name: "Projects", icon: FiStar, href: "/portfolio/projects" },
  { name: "Blogs", icon: FiEdit3, href: "/portfolio/blogs" },
  { name: "Your Site", icon: FiSettings, href: "/portfolio/site" },
];

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useData();

  useEffect(() => {
    try {
      const resumeData = localStorage?.getItem("resumeData");
      const resumeSections = localStorage.getItem("resumeSections");

      if (resumeData) {
        dispatch({ type: "ADD_RESUME_DATA", payload: resumeData });
      }
      if (resumeSections) {
        dispatch({
          type: "ADD_SECTIONS",
          payload: JSON.parse(resumeSections),
        });
      }
    } catch (error) {
      toast.error("Error while retrieving resume data from localStorage.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(
        "Error while retrieving resume data from localStorage.",
        error
      );
    }
  }, []);

  return (
    <Box minH='100vh' bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4' bg='white'>
        <Outlet />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight='1px'
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Box>
          <Link to='/'>
            <Image
              src='/logo.png'
              alt='skillful-cv logo'
              width={"40px"}
              height={"40px"}
            />
          </Link>
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactNode;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as='a'
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: "blackAlpha.50",
        }}
        {...rest}
      >
        {icon && <Icon mr='4' fontSize='16' as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Box>
        <Link to='/'>
          <Image
            src='/logo.png'
            alt='skillful-cv logo'
            width={"40px"}
            height={"40px"}
          />
        </Link>
      </Box>
    </Flex>
  );
};
