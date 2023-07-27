import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import Templates from "./Templates";

type SelectTemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SelectTemplateModal = ({
  isOpen,
  onClose,
}: SelectTemplateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Resume Template</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='1rem'>
            You can click on any of the following resume templates to use it.
          </Text>
          <Templates orientation='vertical' onModalClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
