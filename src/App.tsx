import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Templates from "./components/Templates";
import Footer from "./components/Footer";

function App() {
  return (
    <Box m={"0 10%"}>
      <Navbar />
      <Hero />
      <Templates />
      <Footer />
    </Box>
  );
}

export default App;
