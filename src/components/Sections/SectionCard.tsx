import {
  ButtonGroup,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RxReset } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dashCaseToTitleCase } from "../../utils/caseManipulation";
import AlertResetSectionValueModal from "./AlertResetSectionValueModal";
import { useData } from "../Edit/DataProvider";
import { useMotionValue, Reorder, motion } from "framer-motion";

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
    canDrag: section !== "personal-details",
  });

  drag(drop(ref));
  const y = useMotionValue(0);

  return (
    <motion.div
      drag='y'
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(event, info) => {
        y.set(0);
      }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDragging ? 0.5 : 1 }}
      whileTap={{ scale: 1.05 }}
      whileHover={{ scale: 1.03 }}
    >
      <Flex
        boxShadow={"md"}
        p={"0.8rem"}
        m={"0.8rem"}
        cursor={"pointer"}
        borderRadius={"0.3rem"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: section !== "personal-details" ? "move" : "pointer",
        }}
      >
        <AlertResetSectionValueModal
          isOpen={isOpen}
          onClose={onClose}
          section={section}
        />
        <Flex alignItems={"center"} gap={"0.4rem"} width='71%'>
          {section !== "personal-details" ? (
            <RiDraggable fontSize={"1rem"} />
          ) : null}
          <Text fontSize={"sm"} isTruncated width={"80%"}>
            {dashCaseToTitleCase(section)}
          </Text>
        </Flex>
        <ButtonGroup variant='unstyled' colorScheme='blackAlpha' spacing='2'>
          <IconButton
            minW={"auto"}
            height={"fit-content"}
            aria-label='Reset section value'
            icon={
              <RxReset
                fontSize={"1rem"}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen();
                }}
              />
            }
          />
          {section !== "personal-details" ? (
            <IconButton
              minW={"auto"}
              height={"fit-content"}
              aria-label='Remove added section'
              icon={<MdDelete fontSize={"1rem"} />}
              onClick={(event) => {
                event.stopPropagation();
                dispatch({
                  type: "REMOVE_ADDED_SECTION",
                  payload: section,
                });
              }}
            />
          ) : null}
        </ButtonGroup>
      </Flex>
    </motion.div>
  );
};

export default SectionCard;
