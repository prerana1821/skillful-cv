import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Center,
  Flex,
  Image,
  Box,
  Heading,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type CreatePortfolioModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreatePortfolioModal = ({
  isOpen,
  onClose,
}: CreatePortfolioModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your Portfolio Website</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='1rem'>
            Integrate your information from the following websites:
          </Text>
          <Flex
            p='1rem'
            mx='3rem'
            justifyContent={"space-around"}
            alignItems={"center"}
            gap='5rem'
          >
            <Box>
              <Image
                src='/assets/portfolio/github.png'
                alt='github logo'
                width={"80px"}
                height={"80px"}
              />
              <Heading as='h3' size={"md"} textAlign={"center"} pt='1rem'>
                Github
              </Heading>
            </Box>
            <Box>
              <Center>
                <Image
                  src='/assets/portfolio/hashnode.png'
                  alt='hashnode logo'
                  width={"80px"}
                  height={"80px"}
                />
              </Center>
              <Heading as='h3' size={"md"} textAlign={"center"} pt='1rem'>
                Hashnode
              </Heading>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            backgroundColor={"#f50057"}
            color='#fff'
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => {
              window.open(`/portfolio/overview`);
            }}
          >
            Next
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
