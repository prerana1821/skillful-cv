import {
  Box,
  SimpleGrid,
  GridItem,
  Stack,
  FormControl,
  Button,
  Flex,
  FormLabel,
  InputGroup,
  Textarea,
  InputLeftAddon,
  Input,
  Avatar,
  Icon,
  chakra,
  Select,
  Heading,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useData } from "../Edit/DataProvider";
import { FormEvent, useReducer, useEffect } from "react";
import InputTag from "./InputTag";
import { Language, Skill, TextLink } from "../../types/interfaces";

type AboutForm = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  jobTitle: string;
  city: string;
  country: string;
  profileSummary: string;
  website: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
  medium: string;
  youtube: string;
  hobbies: string[];
  skills: Skill[];
  languages: Language[];
};

type AboutFormAction = {
  type: string;
  payload: { [key: string]: string | string[] };
};

function reducer(state: AboutForm, action: AboutFormAction) {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default function About() {
  const { value, dispatch } = useData();
  const data = JSON.parse(value);

  const initialState: AboutForm = {
    firstName: data["personal-details"]["first-name"] || "",
    lastName: data["personal-details"]["last-name"] || "",
    emailAddress: data["personal-details"]["email"] || "",
    phoneNumber: data["personal-details"]["phone-number"] || "",
    jobTitle: data["personal-details"]["job-title"] || "",
    city: data["personal-details"]["city"] || "",
    country: data["personal-details"]["country"] || "",
    profileSummary: data["profile-summary"]["description"] || "",
    website:
      (data["links"] &&
        data["links"]["list"].find((link: TextLink) => link.label === "Website")
          ?.link) ||
      "",
    instagram:
      (data["links"] &&
        data["links"]["list"].find(
          (link: TextLink) => link.label === "Instagram"
        )?.link) ||
      "",
    linkedIn:
      (data["links"] &&
        data["links"]["list"].find(
          (link: TextLink) => link.label === "Linkedin"
        )?.link) ||
      "",
    twitter:
      (data["links"] &&
        data["links"]["list"].find((link: TextLink) => link.label === "Twitter")
          ?.link) ||
      "",
    medium:
      (data["links"] &&
        data["links"]["list"].find((link: TextLink) => link.label === "Medium")
          ?.link) ||
      "",
    youtube: "",
    hobbies: (data["hobbies"] && data["hobbies"]["list"]) || [],
    skills: (data["skills"] && data["skills"]["list"]) || [],
    languages: (data["languages"] && data["languages"]["list"]) || [],
  };

  const [state, aboutFormDispatch] = useReducer(reducer, initialState);

  const handleChange = (field: string, value: string | string[]) => {
    aboutFormDispatch({
      type: "UPDATE_FIELDS",
      payload: { [field]: value },
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);

    // console.log(data);

    // dispatch({
    //   type: "ADD_RESUME_DATA",
    //   payload: JSON.stringify({}, null, 2),
    // });
  };

  console.log(data);

  useEffect(() => {
    const resumeData = localStorage?.getItem("resumeData");

    console.log({ resumeData });

    const parsedData = resumeData ? JSON.parse(resumeData) : null;

    const updatedData = {
      firstName: parsedData["personal-details"]["first-name"],
      lastName: parsedData["personal-details"]["last-name"],
      emailAddress: parsedData["personal-details"]["email"],
      phoneNumber: parsedData["personal-details"]["phone-number"],
      jobTitle: parsedData["personal-details"]["job-title"],
      city: parsedData["personal-details"]["city"],
      country: parsedData["personal-details"]["country"],
      profileSummary: parsedData["profile-summary"]["description"],
      website:
        (parsedData["links"] &&
          parsedData["links"]["list"].find(
            (link: TextLink) => link.label === "Website"
          )?.link) ||
        "",
      instagram:
        (parsedData["links"] &&
          parsedData["links"]["list"].find(
            (link: TextLink) => link.label === "Instagram"
          )?.link) ||
        "",
      linkedIn:
        (parsedData["links"] &&
          parsedData["links"]["list"].find(
            (link: TextLink) => link.label === "Linkedin"
          )?.link) ||
        "",
      twitter:
        (parsedData["links"] &&
          parsedData["links"]["list"].find(
            (link: TextLink) => link.label === "Twitter"
          )?.link) ||
        "",
      medium:
        (parsedData["links"] &&
          parsedData["links"]["list"].find(
            (link: TextLink) => link.label === "Medium"
          )?.link) ||
        "",
      hobbies: parsedData["hobbies"] ? parsedData["hobbies"]["list"] : [],
      skills: parsedData["skills"] ? parsedData["skills"]["list"] : [],
      languages: parsedData["languages"] ? parsedData["languages"]["list"] : [],
    };

    const action = {
      type: "UPDATE_FIELDS",
      payload: updatedData,
    };

    aboutFormDispatch(action);
  }, []);

  return (
    <Box>
      <SimpleGrid
        display={{
          base: "initial",
          md: "grid",
        }}
        columns={{
          md: 3,
        }}
        spacing={{
          md: 6,
        }}
      >
        <GridItem
          mt={[5, null, 0]}
          colSpan={{
            md: 2,
          }}
        >
          <Heading as='h2' size='lg' px='6' py='4'>
            About Me
          </Heading>
          <chakra.form
            onSubmit={handleSubmit}
            method='POST'
            rounded={[null, "md"]}
            overflow={{
              sm: "hidden",
            }}
          >
            <Stack
              px={4}
              py={5}
              spacing={6}
              p={{
                sm: 6,
              }}
            >
              <SimpleGrid columns={6} spacing={6}>
                <FormControl as={GridItem} colSpan={[6, 4]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Profile Picture
                  </FormLabel>
                  <Flex alignItems='center' mt={1}>
                    <Avatar
                      boxSize={"20"}
                      bg='gray.100'
                      _dark={{
                        bg: "gray.800",
                      }}
                      icon={
                        <Icon
                          as={FaUser}
                          boxSize={9}
                          mt={3}
                          rounded='full'
                          color='gray.300'
                          _dark={{
                            color: "gray.700",
                          }}
                        />
                      }
                    />
                    <Button
                      type='button'
                      ml={5}
                      variant='outline'
                      size='sm'
                      fontWeight='medium'
                      _focus={{
                        shadow: "none",
                      }}
                    >
                      Upload Photo
                    </Button>
                  </Flex>
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor='firstName'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    First name
                  </FormLabel>
                  <Input
                    type='text'
                    isDisabled={true}
                    name='firstName'
                    mt={1}
                    shadow='sm'
                    size='sm'
                    rounded='md'
                    value={state.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor='lastName'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Last name
                  </FormLabel>
                  <Input
                    isDisabled={true}
                    type='text'
                    name='lastName'
                    id='lastName'
                    autoComplete='family-name'
                    mt={1}
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    rounded='md'
                    value={state.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor='emailAddress'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Email address
                  </FormLabel>
                  <Input
                    type='text'
                    name='emailAddress'
                    id='emailAddress'
                    isDisabled={true}
                    autoComplete='email'
                    mt={1}
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    rounded='md'
                    value={state.emailAddress}
                    onChange={(e) =>
                      handleChange("emailAddress", e.target.value)
                    }
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor='phoneNumber'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Phone number
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      +91
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      name='phoneNumber'
                      id='phoneNumber'
                      focusBorderColor='brand.400'
                      shadow='sm'
                      rounded='md'
                      value={state.phoneNumber}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 4]}>
                  <FormLabel
                    htmlFor='jobTitle'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Job Title
                  </FormLabel>
                  <Input
                    type='text'
                    name='jobTitle'
                    id='jobTitle'
                    mt={1}
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    rounded='md'
                    value={state.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor='city'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    City
                  </FormLabel>
                  <Input
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='city'
                    mt={1}
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    rounded='md'
                    value={state.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor='country'
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Country / Region
                  </FormLabel>
                  <Select
                    id='country'
                    name='country'
                    autoComplete='country'
                    placeholder='Select option'
                    mt={1}
                    focusBorderColor='brand.400'
                    shadow='sm'
                    size='sm'
                    w='full'
                    rounded='md'
                    value={state.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>India</option>
                  </Select>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 6]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Profile Summary
                  </FormLabel>
                  <Textarea
                    placeholder='Brief Details'
                    mt={1}
                    rows={3}
                    shadow='sm'
                    focusBorderColor='brand.400'
                    fontSize={{
                      sm: "sm",
                    }}
                    value={state.profileSummary}
                    onChange={(e) =>
                      handleChange("profileSummary", e.target.value)
                    }
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 6]}>
                  <Heading as='h3' size='md' py='4'>
                    Social Links
                  </Heading>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 3]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Website
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      placeholder='www.example.com'
                      focusBorderColor='brand.400'
                      rounded='md'
                      value={state.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 3]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Instagram
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      placeholder='www.example.com'
                      focusBorderColor='brand.400'
                      rounded='md'
                      value={state.instagram}
                      onChange={(e) =>
                        handleChange("instagram", e.target.value)
                      }
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 3]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    LinkedIn
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      placeholder='www.example.com'
                      focusBorderColor='brand.400'
                      rounded='md'
                      value={state.linkedIn}
                      onChange={(e) => handleChange("linkedIn", e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 3]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Twitter
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      placeholder='www.example.com'
                      focusBorderColor='brand.400'
                      rounded='md'
                      value={state.twitter}
                      onChange={(e) => handleChange("twitter", e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 3]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Medium
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      placeholder='www.example.com'
                      focusBorderColor='brand.400'
                      rounded='md'
                      value={state.medium}
                      onChange={(e) => handleChange("medium", e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 3]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Youtube
                  </FormLabel>
                  <InputGroup size='sm'>
                    <InputLeftAddon
                      bg='gray.50'
                      _dark={{
                        bg: "gray.800",
                      }}
                      color='gray.500'
                      rounded='md'
                    >
                      https://
                    </InputLeftAddon>
                    <Input
                      type='tel'
                      placeholder='www.example.com'
                      focusBorderColor='brand.400'
                      rounded='md'
                      value={state.youtube}
                      onChange={(e) => handleChange("youtube", e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 6]}>
                  <Heading as='h3' size='md' py='4'>
                    Hobbies
                  </Heading>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 6]}>
                  <FormLabel
                    fontSize='sm'
                    fontWeight='md'
                    color='gray.700'
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Add Hobbies
                  </FormLabel>
                  <InputTag
                    value={state.hobbies}
                    onChange={(hobbies) => handleChange("hobbies", hobbies)}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 6]}>
                  <Heading as='h3' size='md' py='4'>
                    Skills
                  </Heading>
                </FormControl>

                {state.skills.map((skill) => {
                  return (
                    <>
                      <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                          htmlFor='skill-name'
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Name
                        </FormLabel>
                        <Input
                          type='text'
                          name='skill-name'
                          id='skill-name'
                          autoComplete='skill-name'
                          mt={1}
                          focusBorderColor='brand.400'
                          shadow='sm'
                          size='sm'
                          w='full'
                          rounded='md'
                          value={skill.name}
                          // onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                          htmlFor='country'
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Level
                        </FormLabel>
                        <Select
                          id='skill-level'
                          name='skill-level'
                          placeholder='Select option'
                          mt={1}
                          focusBorderColor='brand.400'
                          shadow='sm'
                          size='sm'
                          w='full'
                          rounded='md'
                          value={skill.level}
                          // onChange={(e) => handleChange("country", e.target.value)}
                        >
                          <option value='Noice'>Noice</option>
                          <option value='Beginner'>Beginner</option>
                          <option value='Skillful'>Skillful</option>
                          <option value='Expert'>Expert</option>
                          <option value='Experienced'>Experienced</option>
                        </Select>
                      </FormControl>
                    </>
                  );
                })}

                <FormControl as={GridItem} colSpan={[3, 6]}>
                  <Heading as='h3' size='md' py='4'>
                    Languages
                  </Heading>
                </FormControl>

                {state.languages.map((language) => {
                  return (
                    <>
                      <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                          htmlFor='language-name'
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Name
                        </FormLabel>
                        <Input
                          type='text'
                          name='language-name'
                          id='language-name'
                          autoComplete='language-name'
                          mt={1}
                          focusBorderColor='brand.400'
                          shadow='sm'
                          size='sm'
                          w='full'
                          rounded='md'
                          value={language.name}
                          // onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                          htmlFor='country'
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Level
                        </FormLabel>
                        <Select
                          id='language-level'
                          name='skill-level'
                          autoComplete='skill-level'
                          placeholder='Select option'
                          mt={1}
                          focusBorderColor='brand.400'
                          shadow='sm'
                          size='sm'
                          w='full'
                          rounded='md'
                          value={language.level}
                          // onChange={(e) => handleChange("country", e.target.value)}
                        >
                          <option value='Native speaker'>Native speaker</option>
                          <option value='Highly proficient'>
                            Highly proficient
                          </option>
                          <option value='Very good command'>
                            Very good command
                          </option>
                        </Select>
                      </FormControl>
                    </>
                  );
                })}
              </SimpleGrid>
            </Stack>
            <Box
              px={{
                base: 4,
                sm: 6,
              }}
              py={3}
              textAlign='right'
            >
              <Button
                type='submit'
                backgroundColor='#f50057'
                color='#fff'
                _focus={{
                  shadow: "",
                }}
                fontWeight='medium'
              >
                Save
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
