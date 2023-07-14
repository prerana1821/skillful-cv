import { dashCaseToTitleCase } from "@/utils/caseManipulation";
import { Button, Flex, Text } from "@chakra-ui/react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import AlertResetSectionValueModal from "./AlertResetSectionValueModal";
import { IconContext } from "react-icons/lib";
import { useRef, MouseEvent } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DragItem {
  section: string;
  index: number;
}

const SectionCard = ({
  showSection,
  isOpen,
  onClose,
  section,
  resetDefaultSection,
  onOpen,
  removeAddedSection,
  index,
  moveCard,
}: {
  showSection: (event: MouseEvent<HTMLDivElement>) => void;
  isOpen: boolean;
  onClose: () => void;
  section: string;
  resetDefaultSection: (section: string) => void;
  onOpen: () => void;
  removeAddedSection: (
    event: MouseEvent<HTMLButtonElement>,
    section: string
  ) => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef(null);

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
      p={"0.5rem 1rem"}
      fontSize={"lg"}
      cursor={"pointer"}
      m={"1rem"}
      //   onClick={showSection}
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
        resetDefaultSection={resetDefaultSection}
      />
      <Flex alignItems={"center"} gap={"0.4rem"} width='71%'>
        <RiDraggable fontSize={"1.5rem"} />
        <Text isTruncated width={"80%"}>
          {dashCaseToTitleCase(section)}
        </Text>
      </Flex>
      <Flex width='29%'>
        <Button
          variant={"unstyled"}
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          <IconContext.Provider value={{ style: { margin: "auto" } }}>
            <GrPowerReset fontSize={"1.3rem"} />
          </IconContext.Provider>
        </Button>
        <Button
          variant={"unstyled"}
          onClick={(event) => removeAddedSection(event, section)}
        >
          <MdDelete fontSize={"1.5rem"} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default SectionCard;
