import {
  server,
  expect,
  uploadsDir,
  imageName,
  imagePath,
  uploadedImagePath,
  multipartUpload
} from "./support";
import rimraf from "rimraf";
import fs from "fs";
import Jimp from "jimp";
import FormData from "form-data";
import streamToPromise from "stream-to-promise";

describe("POST /", () => {
  const coordinates = [[5, 10], [15, 25]];
  const derivatives = { foo: coordinates };

  const form = new FormData();
  form.append("derivatives", JSON.stringify(derivatives));
  form.append("image", fs.createReadStream(imagePath), { knownLength: fs.statSync(imagePath).size });

  // Nuke the uploads directory after running
  after(() => rimraf.sync(`${uploadsDir}/*`));

  it("saves the file", () => {
    return streamToPromise(form).then((payload) => {
      const options = {
        method: "POST",
        url: "/",
        headers: {
          "content-type": "multipart/form-data; boundary=" + form.getBoundary(),
          "content-length": form.getLengthSync()
        },
        payload: payload
      };

      return server.injectThen(options).then((response) => {
        expect(fs.statSync(uploadedImagePath).isFile()).to.eql(true);
      });
    }).catch((err) => { throw err });
  });

    // it("returns the file", () => {
    //   const options = {
    //     method: "GET",
    //     url: foundURL,
    //   };
    //
    //   return server.injectThen(options).then((response) => {
    //     expect(response.statusCode).to.equal(200);
    //   });
    // });
});
