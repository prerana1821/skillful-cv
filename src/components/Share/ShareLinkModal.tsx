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
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useData } from "../Edit/DataProvider";

const CLIENT_BASE_URL = process.env.REACT_APP_CLIENT_BASE_URL;

type ShareLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ShareLinkModal = ({ isOpen, onClose }: ShareLinkModalProps) => {
  const initialRef = useRef(null);

  const [isResumeLinkCopied, setIsResumeLinkCopied] = useState(false);
  const { resumeId } = useData();

  const copyLink = () => {
    navigator.clipboard
      .writeText(`${CLIENT_BASE_URL}share/${resumeId}`)
      .then(() => {
        console.log("Link copied to clipboard:");
        setIsResumeLinkCopied(true);
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share a Link to Your Resume</ModalHeader>
        <ModalCloseButton onClick={() => setIsResumeLinkCopied(false)} />
        <ModalBody>
          <Text mb='1rem'>
            Share this link on social media or copy and paste the URL to send
            your resume via text, email or to share your resume on your personal
            website.
          </Text>
          <FormControl>
            <FormLabel>Copy this URL</FormLabel>
            <Input
              ref={initialRef}
              value={`${CLIENT_BASE_URL}${resumeId}`}
              border={
                isResumeLinkCopied ? "2px solid #f50057" : "solid gray.300"
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant='outline'
            mr={3}
            onClick={() => {
              window.open(`/share/${resumeId}`);
            }}
          >
            Open Link
          </Button>
          <Button
            backgroundColor={"#f50057"}
            color='#fff'
            _hover={{
              opacity: 0.8,
            }}
            onClick={copyLink}
          >
            {isResumeLinkCopied ? "Link Copied!" : "Copy Link"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
