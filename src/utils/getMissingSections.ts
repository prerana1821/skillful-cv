export const getMissingSections = (keys: string[], allSections: string[]) => {
  return keys.filter((key) => !allSections.includes(key));
};
