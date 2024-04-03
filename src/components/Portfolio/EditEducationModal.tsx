import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { EducationI } from "../../types/interfaces";

const EducationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        degree: "",
        institution: "",
        city: "",
        startDate: "",
        endDate: "",
        description: "",
      }}
      onSubmit={(values: EducationI) => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
          console.log(values);
          setIsSubmitting(false);
          // resetForm();
        }, 1000);
      }}
    >
      <Form>
        <Stack spacing={6}>
          <Heading as='h2' size='lg'>
            Education
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
            <FormControl>
              <FormLabel>Degree</FormLabel>
              <Field as={Input} name='degree' required={true} />
            </FormControl>
            <FormControl>
              <FormLabel>Institution</FormLabel>
              <Field as={Input} required={true} name='institution' />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Field as={Input} required={true} name='city' />
            </FormControl>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Field as={Input} required={true} name='startDate' type='date' />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Field as={Input} required={true} name='endDate' type='date' />
            </FormControl>
            <FormControl aria-colspan={2}>
              <FormLabel>Description</FormLabel>
              <Field as={Textarea} required={true} name='description' />
            </FormControl>
          </SimpleGrid>
          <Flex justify='flex-end'>
            <Button
              type='submit'
              colorScheme='pink'
              isLoading={isSubmitting}
              loadingText='Submitting'
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Form>
    </Formik>
  );
};

export const EditEducationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Education</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EducationForm />
        </ModalBody>
        <ModalFooter gap='1rem'>
          <Button variant={"solid"} onClick={onClose}>
            Save
          </Button>
          <Button variant={"outline"} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
