// export const hasValidCharacters = (text: string): boolean => {
//   const validCharacters = ["{", "}", '"', ","];

import { ListItemI, ValueI } from "../types/interfaces";

//   for (let i = 0; i < text.length; i++) {
//     if (!validCharacters.includes(text[i])) {
//       return true;
//     }
//   }

//   return false;
// };

export const isValidSelection = (selectedText: string) => {
  const validCharacters = ["{", "}", '"', ","];

  for (let i = 0; i < selectedText.length; i++) {
    if (
      selectedText &&
      selectedText.length > 0 &&
      !validCharacters.includes(selectedText[i])
    ) {
      return true;
    }
  }

  return false;
};

// export const isTextInDescription = (selectedText: string, data: any) => {
//   for (const section of Object.values(data)) {
//     if (section!.description && section!.description!.includes(selectedText)) {
//       return "value";
//     }
//     if (section!.list && Array.isArray(section!.list)) {
//       for (const item of section?.list) {
//         if (item.description && item.description.includes(selectedText)) {
//           return "value";
//         }
//         if (
//           item.descriptionList &&
//           Array.isArray(item.descriptionList) &&
//           item.descriptionList.includes(selectedText)
//         ) {
//           return "value";
//         }
//       }
//     }
//   }
//   return null;
// };

interface DescriptionItem {
  description?: string;
  list?: ListItemI[];
}

export const isTextInDescription = (selectedText: string, data: ValueI) => {
  for (const section of Object.values(data)) {
    const sectionData = section as DescriptionItem;
    if (
      sectionData.description &&
      sectionData.description.includes(selectedText)
    ) {
      return true;
    }
    if (sectionData.list && Array.isArray(sectionData.list)) {
      for (const item of sectionData.list) {
        if (item.description && item.description.includes(selectedText)) {
          return true;
        }
        if (
          item.descriptionList &&
          Array.isArray(item.descriptionList) &&
          item.descriptionList.includes(selectedText)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

// export const isTextInDescription = (selectedText: string, data: ValueI) => {
//   for (const section of Object.values(data)) {
//     const sectionData = section as DescriptionItem;
//     if (
//       sectionData.description &&
//       sectionData.description.includes(selectedText)
//     ) {
//       return true;
//     }
//     if (sectionData.list && Array.isArray(sectionData.list)) {
//       for (const item of sectionData.list) {
//         if (item.description && item.description.includes(selectedText)) {
//           return true;
//         }
//         if (
//           item.descriptionList &&
//           Array.isArray(item.descriptionList) &&
//           item.descriptionList.includes(selectedText)
//         ) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };
