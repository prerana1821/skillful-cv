import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { EducationI, ProfessionalExperience } from "../../types/interfaces";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function CardWithTitle({
  experience,
  education,
}: {
  experience?: ProfessionalExperience;
  education?: EducationI;
}) {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
            alt='#'
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {experience
              ? `${experience?.["start-date"]} - ${experience?.["end-date"]}`
              : `${education?.["start-date"]} - ${education?.["end-date"]}`}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {experience ? experience?.employer : education?.degree}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={600} fontSize={"lg"}>
              {experience ? experience?.title : education?.institution}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
