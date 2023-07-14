export const dashCaseToTitleCase = (str: string) => {
  const words = str.split("-");
  const capitalizedWords = words.map(
    (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};

export const titleCaseToDashCase = (str: string) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};

export const titleCaseToSnakeCase = (str: string) => {
  return str.replace(/\s+/g, "_").toLowerCase();
};

export const dashToSnakeCase = (str: string) => {
  return str.replace(/-/g, "_");
};
