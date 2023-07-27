import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import Preview from "../Edit/Preview";
import ReactToPrint from "react-to-print";
import { PiDownloadSimple } from "react-icons/pi";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const Share = () => {
  const { resumeId } = useParams();
  const componentRef = useRef(null);

  const [resumeData, setResumeData] = useState<any>({
    data: "",
    sections: [],
    loading: "",
    error: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setResumeData((prevData: any) => ({
          ...prevData,
          loading: "Loading data from server...",
        }));
        const { status, data } = await axios.get(
          `${API_URL}resumes/${resumeId}`
        );
        if (status === 200) {
          console.log({ data });
          setResumeData({
            data: JSON.parse(data.data.resumeValue),
            sections: Object.keys(JSON.parse(data.data.resumeValue)),
            loading: "",
          });
        }
      } catch (error) {
        console.log(error);
        setResumeData((prevData: any) => ({
          ...prevData,
          error: "Sorry, try again later...",
        }));
      }
    })();
  }, [resumeId]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    return (
      <Button
        variant='solid'
        display={"flex"}
        gap={"0.3rem"}
        backgroundColor='#f50057'
        color='#fff'
        alignItems={"center"}
        fontSize={"sm"}
        _hover={{ backgroundColor: "none" }}
      >
        <PiDownloadSimple fontSize='md' />
        Download
      </Button>
    );
  }, []);

  return (
    <Box minH={"100vh"}>
      <Flex
        justifyContent={"space-between"}
        width='55%'
        m='auto'
        alignItems={"center"}
      >
        <Link to='/'>
          <Heading
            as='h3'
            size={"md"}
            color={"#f50057"}
            my='1rem'
            fontFamily={"cursive"}
          >
            Skillful CV
          </Heading>
        </Link>
        <ReactToPrint
          content={reactToPrintContent}
          documentTitle='Skillful-CV'
          trigger={reactToPrintTrigger}
        />
      </Flex>
      {resumeData.loading && (
        <Image src='/loading.gif' alt='Loading...' m='auto' width={"150px"} />
      )}
      {resumeData.error && (
        <Heading as='h3' size={"sm"} my='1rem'>
          {resumeData.error}
        </Heading>
      )}
      {resumeData.data && (
        <Center>
          <Preview
            styles={{
              boxShadow:
                "0 20px 60px 0 rgba(186,200,227,.1), 0 16px 36px 0 rgba(186,200,227,.3)",
              border: "none",
              width: "55%",
              margin: "1rem auto 2rem",
            }}
            sections={{ default: resumeData.sections, extra: [] }}
            value={resumeData.data}
            ref={componentRef}
          />
        </Center>
      )}
    </Box>
  );
};
