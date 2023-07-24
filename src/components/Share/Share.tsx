import { Box, Center, Heading, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Preview from "../Edit/Preview";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const Share = () => {
  const { resumeId } = useParams();

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

  return (
    <Box>
      <Center>
        <Heading
          as='h3'
          size={"md"}
          color={"#f50057"}
          my='1rem'
          fontFamily={"cursive"}
        >
          Skillful CV
        </Heading>
      </Center>
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
          />
        </Center>
      )}
    </Box>
  );
};
