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
          <Button
            backgroundColor='#F50057'
            color='#fff'
            mr={3}
            onClick={onClose}
            _hover={{
              opacity: 0.7,
            }}
          >
            Close
          </Button>

          <Button
            variant='outline'
            border={"1px solid #f50057"}
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
