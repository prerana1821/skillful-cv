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
import { SetStateAction, Dispatch, useRef } from "react";

type ShareLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isResumeLinkCopied: boolean;
  setIsResumeLinkCopied: Dispatch<SetStateAction<boolean>>;
  resumeId: string;
  copyLink: () => void;
};

export const ShareLinkModal = ({
  isOpen,
  onClose,
  setIsResumeLinkCopied,
  isResumeLinkCopied,
  resumeId,
  copyLink,
}: ShareLinkModalProps) => {
  const initialRef = useRef(null);

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
              value={`https:localhost:3000/share/${resumeId}`}
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
