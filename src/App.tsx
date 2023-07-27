import { Box } from "@chakra-ui/react";
import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Layout/Hero";
import Templates from "./components/Templates/Templates";
import Footer from "./components/Layout/Footer";
import ProductSlider from "./components/Layout/ProductSlider";

function App() {
  return (
    <Box
      background={
        "linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(43,0,15,1) 28%, rgba(70,0,25,1) 44%, rgba(95,0,34,1) 70%, rgba(172,0,61,1) 100%, rgba(245,0,87,1) 100%);"
      }
    >
      <Navbar showColorMode />
      <Hero />
      <ProductSlider />
      <Templates />
      <Footer />
    </Box>
  );
}

export default App;
