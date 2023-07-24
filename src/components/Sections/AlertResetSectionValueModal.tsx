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

const AlertResetSectionValueModal = ({
  isOpen,
  section,
  onClose,
  resetDefaultSection,
}: {
  isOpen: boolean;
  section: string;
  onClose: () => void;
  resetDefaultSection: (section: string) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset to default template value</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to reset to the default section value?
        </ModalBody>

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
              resetDefaultSection(section);
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

export default AlertResetSectionValueModal;
