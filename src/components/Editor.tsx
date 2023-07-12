import { Box, Flex, Heading } from "@chakra-ui/react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import ace from "ace-builds/src-noconflict/ace";
import { SetStateAction, Dispatch } from "react";
import { validJSON } from "@/app/utils/validJSON";

ace.config.setModuleUrl(
  "ace/mode/json_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-json.js"
);

const Editor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  function onChange(newValue: string) {
    if (validJSON(newValue)) {
      console.log("change", newValue);
      setValue(newValue);
    }
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
