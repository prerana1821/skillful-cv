import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { IconContext } from "react-icons/lib";
import { useRef, MouseEvent } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";
import AlertResetSectionValueModal from "./AlertResetSectionValueModal";
import { useData } from "../Edit/DataProvider";

interface DragItem {
  section: string;
  index: number;
}

const SectionCard = ({
  section,
  index,
  moveCard,
}: {
  section: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch } = useData();

  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { section, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Flex
      boxShadow={"md"}
      p={"0.5rem 0.8rem"}
      m={"0.8rem"}
      cursor={"pointer"}
      borderRadius={"0.3rem"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <AlertResetSectionValueModal
        isOpen={isOpen}
        onClose={onClose}
        section={section}
      />
      <Flex alignItems={"center"} gap={"0.4rem"} width='71%'>
        <RiDraggable fontSize={"1rem"} />
        <Text fontSize={"sm"} isTruncated width={"80%"}>
          {dashCaseToTitleCase(section)}
        </Text>
      </Flex>
      <Flex width='29%' gap='0.3rem' justifyContent={"end"}>
        <Button
          variant={"unstyled"}
          minW={5}
          height={6}
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          <IconContext.Provider value={{ style: { margin: "auto" } }}>
            <GrPowerReset fontSize={"0.9rem"} />
          </IconContext.Provider>
        </Button>
        <Button
          variant={"unstyled"}
          minW={5}
          height={6}
          onClick={(event) => {
            event.stopPropagation();

            dispatch({
              type: "REMOVE_ADDED_SECTION",
              payload: section,
            });
          }}
        >
          <MdDelete fontSize={"1rem"} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default SectionCard;
