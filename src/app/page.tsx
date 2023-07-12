"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box m={"0 10%"}>
      <Navbar />
      <Hero />
      <Footer />
    </Box>
  );
}
