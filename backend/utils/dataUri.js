import DataURIParser from "datauri/parser.js";
import path from "path";

const parser = new DataURIParser();

const getDataUri = (file) => {
  if (!file) throw new Error("File not provided or invalid.");

  // console.log("FILE in dataURI", file)

  const extName = path.extname(file.originalname).toString(); // Fix typo from `originalName`
  // console.log("FILE DATAURI", extName)
  const data = parser.format(extName, file.buffer);
  // console.log("FILE DATAURI", data)
  return data;
};

export default getDataUri;
