import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import CardWithTitle from "./CardWithTitle";
import { MdAdd } from "react-icons/md";
import { useData } from "../Edit/DataProvider";
import { ProfessionalExperience } from "../../types/interfaces";

export default function Experience() {
  const { value } = useData();
  const data = JSON.parse(value);

  console.log(data["professional-experience"]);

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        m='1rem 2.5rem'
      >
        <Heading as='h2' size='md'>
          Experience
        </Heading>
        <Button
          variant={"outline"}
          border={"2px solid #f50057"}
          _hover={{
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          rightIcon={<MdAdd fontSize={"1rem"} />}
        >
          Add New Experience
        </Button>
      </Flex>
      <Flex
        flexWrap={"wrap"}
        gap='4rem'
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        minH={"90vh"}
        overflow={"hidden"}
        px='3rem'
      >
        {data["professional-experience"] &&
          data["professional-experience"]["list"].map(
            (experience: ProfessionalExperience) => {
              return (
                <CardWithTitle
                  experience={experience}
                  key={Math.random() * 10}
                />
              );
            }
          )}
      </Flex>
    </Box>
  );
}
