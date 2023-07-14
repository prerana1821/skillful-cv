import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SetStateAction, Dispatch } from "react";
import { validJSON } from "@/utils/validJSON";

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    await import("ace-builds/src-noconflict/theme-solarized_dark");
    await import("ace-builds/src-noconflict/mode-json");
    await import("ace-builds/src-noconflict/ext-language_tools");
    return ace;
  },
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const Editor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  function onChange(newValue: string) {
    if (validJSON(newValue)) {
      console.log("change", newValue);
      setValue(newValue);
    }
  }

  if (typeof window === "undefined" || !editorLoaded) {
    return null; // Render nothing during server-side rendering or if editor is not loaded yet
  }

  return (
    <Box
      flex={{ base: "none", sm: "35%" }}
      height={{ base: "100vh", sm: "auto" }}
    >
      <Heading as='h3' size='md' mb='0.5rem'>
        Editor
      </Heading>
      <AceEditor
        placeholder='Start writing your resume'
        mode='json'
        theme='solarized_dark'
        width='100%'
        height='96.5%'
        name='editor'
        wrapEnabled={true}
        onChange={onChange}
        fontSize={18}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        editorProps={{ $blockScrolling: true }}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </Box>
  );
};

export default Editor;
