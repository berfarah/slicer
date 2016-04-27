import {server, expect, uploadsDir} from "./support";
import fs from "fs";

describe("GET /uploads/{params*}", () => {
  const NOT_FOUND = "foo";
  const FOUND = "bar";
  const foundPath = `${uploadsDir}/${FOUND}`;
  const foundURL = `/uploads/${FOUND}`;
  const notFoundURL = `/uploads/${NOT_FOUND}`;

  before(() => {
    fs.openSync(foundPath, "w");
  });

  after(() => {
    fs.unlinkSync(foundPath);
  });

  context("when the file exists", () => {
    it("returns the file", () => {
      const options = {
        method: "GET",
        url: foundURL,
      };

      return server.injectThen(options).then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  context("when the file doesn't exist", () => {
    it("returns a 404", () => {
      const options = {
        method: "GET",
        url: notFoundURL,
      };

      return server.injectThen(options).then((response) => {
        expect(response.statusCode).to.equal(404);
      });
    });
  });
});
