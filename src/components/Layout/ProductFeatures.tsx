import { Box } from "@chakra-ui/react";
import { FeaturedSection } from "./FeaturedSection";

export const ProductFeatures = () => {
  return (
    <Box>
      <FeaturedSection
        titleHeading={"Instant Access, Anywhere"}
        titleSubHeading={"w/ Export, Share & QR-Code "}
        description={
          "Extend your resume's reach effortlessly with Skillful CV. Export it to a professional PDF, share it as a convenient link, and even generate a QR code for quick access, so your accomplishments never go unnoticed."
        }
        image='/assets/features/share.png'
        align='left'
      />
      <FeaturedSection
        titleHeading={"Tailor-Made Resumes"}
        titleSubHeading={"with Drag & Drop Ease"}
        description='Personalize your resume exactly how you envision it, thanks to our
            intuitive drag and drop feature. Skillful CV allows you to create
            and arrange sections with a simple drag, offering unparalleled
            flexibility for showcasing your skills.'
        image='/assets/features/sections.png'
        align='right'
      />
      <FeaturedSection
        titleHeading={"Smart Refinements"}
        titleSubHeading={"AI-Backed Content Suggestions"}
        description={
          "Fine-tune your resume with the precision of AI suggestions from Skillful CV. Tailor your content with confidence using AI-driven rephrasing, content continuation, tone adjustments, keyword recommendations, and language enhancements."
        }
        image='/assets/features/aisuggestions.png'
        align='left'
      />

      <FeaturedSection
        titleHeading={"Find Your Perfect Fit"}
        titleSubHeading={"Try On Multiple Resume Templates"}
        description={
          "Stand out from the crowd within seconds! Skillful CV lets you preview multiple templates, empowering you to visualize your resume's potential and make an impactful choice."
        }
        image='/assets/features/templates.png'
        align='right'
      />
    </Box>
  );
};
