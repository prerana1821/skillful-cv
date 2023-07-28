import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useRef } from "react";
import { useData } from "./DataProvider";
import { RxReset } from "react-icons/rx";
import {
  AddCustomSectionModal,
  SectionCardExtra,
  SectionCardDefault,
  AlertResetSectionsModal,
} from "../Sections";

const Sections = () => {
  const { sections, dispatch } = useData();

  const {
    isOpen: resetSectionsIsOpen,
    onOpen: resetSectionsOnOpen,
    onClose: resetSectionsOnClose,
  } = useDisclosure();

  const {
    isOpen: addCustomSectionIsOpen,
    onOpen: addCustomSectionOnOpen,
    onClose: addCustomSectionOnClose,
  } = useDisclosure();

  const initialAddCustomSectionModalRef = useRef(null);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = sections.default[dragIndex];
    const updatedSections = [...sections.default];
    updatedSections.splice(dragIndex, 1);
    updatedSections.splice(hoverIndex, 0, draggedCard);
    dispatch({
      type: "UPDATE_SECTIONS",
      payload: updatedSections,
    });
  };

  return (
    <Box
      flex={{ base: "none", sm: "20%" }}
      height={{ base: "100vh", sm: "auto" }}
      overflowY={"auto"}
      overflowX={"hidden"}
      pl='0.8rem'
    >
      <AlertResetSectionsModal
        isOpen={resetSectionsIsOpen}
        onClose={resetSectionsOnClose}
      />

      <AddCustomSectionModal
        initialRef={initialAddCustomSectionModalRef}
        isOpen={addCustomSectionIsOpen}
        onClose={addCustomSectionOnClose}
        addCustomSectionOnClose={addCustomSectionOnClose}
      />

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as='h3' size='xs'>
          Sections
        </Heading>
        <Button
          variant={"ghost"}
          fontSize={"xs"}
          leftIcon={<RxReset />}
          height={8}
          onClick={resetSectionsOnOpen}
        >
          Reset
        </Button>
      </Flex>
      <Box>
        <Text fontSize={"0.7rem"}>
          Drag & drop the sections to change the content.
        </Text>
        {sections.default.map((section, index) => {
          return (
            <SectionCardDefault
              key={index}
              section={section}
              index={index}
              moveCard={moveCard}
            />
          );
        })}
      </Box>
      <Box>
        {sections.extra.length !== 0 && (
          <Text fontSize={"0.7rem"}>
            Click on a section to add it to your resume.
          </Text>
        )}
        <Box
          boxShadow={"md"}
          p={"0.5rem 0.8rem"}
          m={"0.8rem"}
          fontSize={"sm"}
          cursor={"pointer"}
          borderRadius={"0.3rem"}
          display='flex'
          alignItems='center'
          gap='0.5rem'
          justifyContent='center'
          onClick={addCustomSectionOnOpen}
        >
          <IoMdAdd /> Custom Section
        </Box>
        {sections.extra.map((section, index) => {
          return <SectionCardExtra section={section} index={index} />;
        })}
      </Box>
    </Box>
  );
};

export default Sections;
