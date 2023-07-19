import { Box } from "@chakra-ui/react";
import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Layout/Hero";
import Templates from "./components/Templates";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Box m={"0 10%"}>
      <Navbar showColorMode />
      <Hero />
      <Templates />
      <Footer />
    </Box>
  );
}

export default App;
