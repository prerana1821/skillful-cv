import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import { useData } from "../Edit/DataProvider";
import { CheckIcon, SettingsIcon } from "@chakra-ui/icons";

function Profile({
  name,
  jobTitle,
  siteUrl,
}: {
  name: string;
  jobTitle: string;
  siteUrl: string;
}) {
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

  return (
    <Flex
      borderRadius='0.5rem'
      bg={boxBg}
      boxShadow={"md"}
      p='20px'
      h='345px'
      w={{ base: "315px", md: "345px" }}
      alignItems='center'
      direction='column'
    >
      <Image
        src='https://i.ibb.co/xmP2pS6/Profile.png'
        maxW='100%'
        borderRadius='1rem'
      />
      <Flex flexDirection='column' mb='30px'>
        <Image
          src='https://i.ibb.co/B3gYTYs/Profile-Image.png'
          border='5px solid red'
          mx='auto'
          borderColor={boxBg}
          width='68px'
          height='68px'
          mt='-38px'
          borderRadius='50%'
        />
        <Text
          fontWeight='600'
          color={mainText}
          textAlign='center'
          fontSize='xl'
        >
          {name}
        </Text>
        <Text
          color={secondaryText}
          textAlign='center'
          fontSize='sm'
          fontWeight='500'
        >
          {jobTitle}
        </Text>
      </Flex>
      <Flex w='100%' px='36px' justifyContent={"center"}>
        <Button border={"3px solid #5F31EB"} variant={"outline"}>
          View Site
        </Button>
      </Flex>
    </Flex>
  );
}

export default function Overview() {
  const { value } = useData();
  const data = JSON.parse(value);

  return (
    <Box h='95vh'>
      <Box
        h='80vh'
        backgroundImage={"linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"}
        margin='-1rem'
        pt='3rem'
        borderBottomLeftRadius={"2rem"}
      >
        <Heading pl='4rem'>Overview</Heading>
        <Flex m='4rem' alignItems={"center"} gap={"4rem"}>
          <Profile
            name={`${data["personal-details"]["first-name"]} ${data["personal-details"]["last-name"]}`}
            jobTitle={data["personal-details"]["job-title"]}
            siteUrl=''
          />
          <Flex
            borderRadius='0.5rem'
            boxShadow={"md"}
            bgColor={"#fff"}
            p='20px'
            h='345px'
            gap='1rem'
            w={{ base: "315px", md: "600px" }}
            alignItems='baseline'
            direction='column'
          >
            <Image
              src='https://i.ibb.co/xmP2pS6/Profile.png'
              w='100%'
              h='40%'
              borderRadius='0.5rem'
            />

            <FormControl>
              <FormLabel>Your Site Username</FormLabel>
              <InputGroup size='sm'>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                >
                  <SettingsIcon />
                </InputLeftElement>
                <Input
                  size='sm'
                  placeholder='Enter site name'
                  borderRadius={"0.3rem"}
                />
                <InputRightElement>
                  <CheckIcon color='green.500' />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Box>
              <Heading as='h3' size='sm'>
                Instructions :
              </Heading>
              <UnorderedList>
                <ListItem>Lorem ipsum dolor sit amet</ListItem>
                <ListItem>Consectetur adipiscing elit</ListItem>
                <ListItem>Integer molestie lorem at massa</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
