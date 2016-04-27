import fs from "fs";
import path from "path";

const today = () => {
  const dateOnly = 10;
  return new Date().toISOString().slice(0, dateOnly);
}

const createDir = () => {
  const dir = path.join(__dirname, "..", "..", "uploads", today());

  // Attempt to make directory
  try {
    fs.mkdirSync(dir);
  }
  catch(err) {
    try {
      fs.statSync(dir);
    }
    catch (dirNotFound) {
      throw err;
    }
  }

  return dir;
}

const handleUpload = (imageParam) => {
  const saveToPath = path.join(createDir(), imageParam.filename);
  fs.renameSync(imageParam.path, saveToPath)
  return saveToPath;
};

export default handleUpload;
