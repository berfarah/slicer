import {
  server,
  expect,
  uploadsDir,
  imageName,
  imagePath,
  uploadedImagePath,
  fooPath,
  multipartUpload
} from "./support";
import rimraf from "rimraf";
import fs from "fs";
import Jimp from "jimp";
import FormData from "form-data";
import streamToPromise from "stream-to-promise";

describe("POST /", () => {
  const coordinates = [[5, 10], [15, 25]];
  const size = [10, 15];
  const derivatives = { foo: coordinates };

  const form = new FormData();
  form.append("derivatives", JSON.stringify(derivatives));
  form.append("image", fs.createReadStream(imagePath), { knownLength: fs.statSync(imagePath).size });

  // Nuke the uploads directory after running
  after(() => rimraf.sync(`${uploadsDir}/*`));

  const optionsCreator = streamToPromise(form)
    .then((payload) => ({
      method: "POST",
      url: "/",
      headers: {
        "content-type": "multipart/form-data; boundary=" + form.getBoundary(),
        "content-length": form.getLengthSync()
      },
      payload: payload
    }));

  it("saves the file", () => (
    optionsCreator.then((options) => (
      server.injectThen(options).then((response) => {
        expect(fs.statSync(uploadedImagePath).isFile()).to.eql(true);
      })
    ))
  ));

  it("creates a derivative at the right size", () => (
    optionsCreator.then((options) => (
      server.injectThen(options).then((response) => (
        Jimp.read(fooPath).then((image) => {
          expect(image.bitmap.width).to.eql(size[0]);
          expect(image.bitmap.height).to.eql(size[1]);
        })
      ))
    ))
  ));

  it("outputs the path(s)", () => (
    optionsCreator.then((options) => (
      server.injectThen(options).then((response) => {
        const json = JSON.parse(response.payload);
        expect(json.slices).to.deep.eql(["http://localhost:1234/uploads/2016-04-27/example-foo.png"]);
      })
    ))
  ));
});
