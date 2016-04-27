import path from "path";

export * from "chai";

export const rootDir = path.join(__dirname, "..", "..");
export const uploadsDir = path.join(rootDir, "uploads");
export const supportDir = __dirname;

export const today = new Date().toISOString().slice(0, 10);
export const imageName = "example.png";
export const imagePath = path.join(__dirname, imageName);
export const uploadedImagePath = path.join(uploadsDir, today, imageName);
export const fooPath   = path.join(uploadsDir, today, "example-foo.png");

import serverTemp from "../../server";
import injectThen from "inject-then";
serverTemp.register([{ register: injectThen }]);
export const server = serverTemp;
