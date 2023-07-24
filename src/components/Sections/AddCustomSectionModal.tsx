import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { MutableRefObject } from "react";
import { useData } from "../Edit/DataProvider";

type AddCustomSectionModalProps = {
  initialRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
  addCustomSectionOnClose: () => void;
};

export const AddCustomSectionModal = ({
  initialRef,
  isOpen,
  onClose,
  addCustomSectionOnClose,
}: AddCustomSectionModalProps) => {
  const { customSectionTitle, dispatch } = useData();

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='scale'
      size='lg'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Custom Section</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Section name</FormLabel>
            <Input
              ref={initialRef}
              value={customSectionTitle}
              onChange={(e) =>
                dispatch({
                  type: "ADD_CUSTOM_SECTION_TITLE",
                  payload: e.target.value,
                })
              }
              // onChange={(e) => setCustomSectionTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter display={"flex"} gap='1rem'>
          <Button onClick={onClose}>Cancel</Button>
          {/* TODO: Add error is input value is empty.  */}
          <Button
            backgroundColor='#F50057'
            color='#fff'
            mr={3}
            onClick={() => {
              if (customSectionTitle.length > 0) {
                dispatch({
                  type: "ADD_CUSTOM_SECTION",
                  payload: customSectionTitle,
                });

                addCustomSectionOnClose();
              }
            }}
          >
            Add Section
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
