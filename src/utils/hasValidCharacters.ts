import { ListItemI, ValueI } from "../types/interfaces";

interface DescriptionItem {
  description?: string;
  list?: ListItemI[];
}

export const isTextInDescription = (selectedText: string, data: ValueI) => {
  const lowerSelectedText = selectedText?.toLowerCase();

  for (const section of Object.values(data)) {
    const sectionData = section as DescriptionItem;

    if (
      sectionData?.description &&
      sectionData?.description?.toLowerCase().includes(lowerSelectedText)
    ) {
      return true;
    }

    if (sectionData?.list && Array.isArray(sectionData?.list)) {
      for (const item of sectionData?.list) {
        if (
          item?.description &&
          item?.description?.toLowerCase().includes(lowerSelectedText)
        ) {
          return true;
        }
        if (
          item?.descriptionList &&
          Array.isArray(item?.descriptionList) &&
          item?.descriptionList?.some((desc: string) =>
            desc?.toLowerCase().includes(lowerSelectedText)
          )
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export interface KeyObjectFromSelectedText {
  key: string;
  object: any;
  selectedItem?: string;
}

export const findKeyAndObjectForSelectedText = (
  selectedText: string,
  data: any
): KeyObjectFromSelectedText | null => {
  const lowerSelectedText = selectedText.toLowerCase();

  for (const key in data) {
    const section = data[key];
    if (typeof section === "object") {
      if (
        section.description &&
        section.description.toLowerCase().includes(lowerSelectedText)
      ) {
        return { key, object: section };
      }

      if (section.list && Array.isArray(section.list)) {
        for (const item of section.list) {
          if (
            item.description &&
            item.description.toLowerCase().includes(lowerSelectedText)
          ) {
            return { key, object: item };
          }
          if (
            item.descriptionList &&
            Array.isArray(item.descriptionList) &&
            item.descriptionList.some((desc: string) =>
              desc.toLowerCase().includes(lowerSelectedText)
            )
          ) {
            const selectedItem = item.descriptionList.find((desc: string) =>
              desc.toLowerCase().includes(lowerSelectedText)
            );
            return {
              key,
              object: item,
              selectedItem,
            };
          }
        }
      }
    }
  }

  return null;
};
