const getExtension = (extension?: string) => {
  if (extension === "HTML") {
    return "html";
  } else if (extension === "JavaScript") {
    return "js";
  } else {
    return "txt";
  }
};

export default getExtension;
