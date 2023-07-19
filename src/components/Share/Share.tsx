import { Box, Center, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Preview from "../Edit/Preview";

export const Share = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState<any>({
    data: "",
    sections: [],
  });

  useEffect(() => {
    (async () => {
      try {
        // dispatch({
        //   type: "STATUS",
        //   payload: { loading: "Loading data from server..." },
        // });
        const { status, data } = await axios.get(
          `http://localhost:4000/resumes/${resumeId}`
        );
        if (status === 200) {
          console.log({ data });
          setResumeData({
            data: JSON.parse(data.data.resumeValue),
            sections: Object.keys(JSON.parse(data.data.resumeValue)),
          });
        }

        // dispatch({ type: "PRODUCT_DETAIL", payload: data });
        // dispatch({
        //   type: "STATUS",
        //   payload: { loading: "" },
        // });
      } catch (error) {
        console.log(error);

        // dispatch({
        //   type: "STATUS",
        //   payload: { error: "Sorry, try again later.." },
        // });
      }
    })();
  }, [resumeId]);

  return (
    <Box>
      <Center>
        <Heading
          as='h3'
          size={"sm"}
          color={"#f50057"}
          my='1rem'
          fontFamily={"cursive"}
        >
          Skillful CV
        </Heading>
      </Center>
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
