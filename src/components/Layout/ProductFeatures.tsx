import { Box } from "@chakra-ui/react";
import { FeaturedSection } from "./FeaturedSection";

export const ProductFeatures = () => {
  return (
    <Box>
      <FeaturedSection image='/assets/features/share.png' align='left' />
      <FeaturedSection image='/assets/features/sections.png' align='right' />
      <FeaturedSection
        image='/assets/features/aisuggestions.png'
        align='left'
      />
      <FeaturedSection image='/assets/features/templates.png' align='right' />
    </Box>
  );
};
