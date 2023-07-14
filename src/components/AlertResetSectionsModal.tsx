import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const AlertResetSectionsModal = ({
  isOpen,
  onClose,
  resetSections,
}: {
  isOpen: boolean;
  onClose: () => void;
  resetSections: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset Sections</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to reset the sections?</ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>

          <Button
            variant='outline'
            onClick={() => {
              resetSections();
              onClose();
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlertResetSectionsModal;
