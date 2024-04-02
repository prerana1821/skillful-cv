import React, { useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Box, Flex, Tag, TagCloseButton, Input } from "@chakra-ui/react";

type InputTagProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const InputTag: React.FC<InputTagProps> = ({ value, onChange }) => {
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refInput.current?.focus();
  }, []);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const newText = (event.target as HTMLInputElement).value
      .trim()
      .replace(",", "");
    if (event.key === "," || event.key === "Enter") {
      if (newText.length > 0) {
        onChange([...value, newText]);
        refInput.current!.value = "";
      }
    } else if (
      event.key === "Backspace" &&
      value.length > 0 &&
      newText.length === 0
    ) {
      onChange(value.slice(0, -1));
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.trim().length > 0) {
      refInput.current!.size = value.length;
    } else {
      refInput.current!.value = "";
    }
  };

  const handleDelItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Flex onClick={() => refInput.current!.focus()}>
        <Box>
          <Input
            ref={refInput}
            onKeyUp={handleKeyUp}
            mt={1}
            focusBorderColor='brand.400'
            shadow='sm'
            w='xl'
            rounded='md'
            onChange={handleChangeInput}
          />
          <Flex gap='1rem' mt='1rem'>
            {value?.map((text, i) => (
              <Tag key={i + "_" + text} colorScheme='cyan' size='lg'>
                {text}
                <TagCloseButton onClick={() => handleDelItem(i)} />
              </Tag>
            ))}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default InputTag;
