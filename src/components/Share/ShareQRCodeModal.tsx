import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Center,
} from "@chakra-ui/react";
import { useData } from "../Edit/DataProvider";
import QRCode from "react-qr-code";

const CLIENT_BASE_URL = process.env.REACT_APP_CLIENT_BASE_URL;

type ShareQRCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ShareQRCodeModal = ({
  isOpen,
  onClose,
}: ShareQRCodeModalProps) => {
  const { resumeId } = useData();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>QR Code for your Resume</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb='1.5rem'>
          <Text mb='1rem'>
            Scan the below QR Code to view & download your resume.
          </Text>
          <Center
            p='1rem'
            boxShadow={"inset 0px 1px 20px 0px #cccccca6"}
            mx='3rem'
            borderRadius={"1rem"}
          >
            <QRCode
              value={`${CLIENT_BASE_URL}share/${resumeId}`}
              width='200px'
              fgColor={"#f50057"}
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
