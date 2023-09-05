import { Box } from "@chakra-ui/react";
import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Layout/Hero";
import Templates from "./components/Templates/Templates";
import Footer from "./components/Layout/Footer";
import ProductSlider from "./components/Layout/ProductSlider";
import { ProductFeatures } from "./components/Layout/ProductFeatures";

function App() {
  return (
    <Box className='landing-pg'>
      <Navbar showGithubBtns />
      <Hero />
      <ProductSlider />
      <Templates />
      <ProductFeatures />
      <Footer />
    </Box>
  );
}

export default App;
