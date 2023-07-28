import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box id='error-page'>
      <Heading as={"h1"}>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text as='i'>Please try again.</Text>
    </Box>
  );
}
