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
import { SetStateAction, Dispatch, MutableRefObject } from "react";

type AddCustomSectionModalProps = {
  initialRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
  customSectionTitle: string;
  setCustomSectionTitle: Dispatch<SetStateAction<string>>;
  addCustomSection: () => void;
};

export const AddCustomSectionModal = ({
  initialRef,
  isOpen,
  onClose,
  customSectionTitle,
  setCustomSectionTitle,
  addCustomSection,
}: AddCustomSectionModalProps) => {
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
              onChange={(e) => setCustomSectionTitle(e.target.value)}
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
            onClick={addCustomSection}
          >
            Add Section
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
