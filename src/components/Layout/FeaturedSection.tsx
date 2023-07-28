import { Container, Stack, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";

export const FeaturedSection = ({
  titleHeading,
  titleSubHeading,
  description,
  image,
  align,
}: {
  titleHeading: string;
  titleSubHeading: string;
  description: string;
  image: string;
  align: string;
}) => {
  const trans = (x: any, y: any, s: any) =>
    `perspective(400px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const calc = (x: any, y: any) => {
    const newX = x - window.innerWidth / 2;
    const newY = y - window.innerHeight / 2;
    const scaleX = 1.1;
    const scaleY = 1.1;
    const rotateX = newY / 100;
    const rotateY = newX / 100;

    return [rotateX, rotateY, scaleX, scaleY];
  };

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 16 }}
        py={{ base: 20, md: 28 }}
        direction={{
          base: "column",
          md: align === "left" ? "row" : "row-reverse",
        }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 8 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
          >
            <Text as={"span"} color='#fff'>
              {titleHeading}
            </Text>
            <br />
            <Text as={"span"} color={"red.400"} fontSize='4xl'>
              {titleSubHeading}
            </Text>
          </Heading>
          <Text color={"gray.500"}>{description}</Text>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <animated.div
            className='card'
            onMouseMove={(e) => {
              const { clientX: x, clientY: y } = e;

              return set({ xys: calc(x, y) });
            }}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
          >
            <Image
              rounded={"xl"}
              boxShadow={"2xl"}
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"90%"}
              h={"100%"}
              src={image}
              cursor={"pointer"}
            />
          </animated.div>
        </Flex>
      </Stack>
    </Container>
  );
};
