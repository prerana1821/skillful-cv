import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import CardWithTitle from "./CardWithTitle";
import { MdAdd } from "react-icons/md";
import { useData } from "../Edit/DataProvider";
import { EducationI } from "../../types/interfaces";
import { EditEducationModal } from "./EditEducationModal";

export default function Education() {
  const { value } = useData();
  const data = JSON.parse(value);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        m='1rem 2.5rem'
      >
        <Heading as='h2' size='md'>
          Education
        </Heading>
        <Button
          variant={"outline"}
          border={"2px solid #f50057"}
          _hover={{
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          onClick={() => onOpen()}
          rightIcon={<MdAdd fontSize={"1rem"} />}
        >
          Add New Education
        </Button>
      </Flex>
      <EditEducationModal isOpen={isOpen} onClose={onClose} />
      <Flex
        flexWrap={"wrap"}
        gap='4rem'
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        minH={"90vh"}
        overflow={"hidden"}
        px='3rem'
      >
        {data["education"] &&
          data["education"]["list"].map((education: EducationI) => {
            return (
              <CardWithTitle
                education={education}
                key={Math.random() * 10}
                // handleClick={onOpen}
              />
            );
          })}
      </Flex>
    </Box>
  );
}
