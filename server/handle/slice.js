import handleUpload from "./upload";
import Slicer from "../slicer";
import p from "path";

export default (basePath) => ({ payload: {image, derivatives} }, reply) => {
  const path = handleUpload(image);

  new Slicer(path, derivatives).slice()
    .then((paths) => {
      const slices = paths.map((path) => (
        path.replace(p.join(__dirname, "..", ".."), basePath)
      ));

      reply({slices});
    })
    .catch((error) => reply({error}));
};
