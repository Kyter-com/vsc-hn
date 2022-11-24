const getExtension = (extension?: string) => {
  if (extension === "HTML") {
    return "html";
  } else {
    return "txt";
  }
};

export default getExtension;
