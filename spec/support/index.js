import path from "path";

export * from "chai";

export const rootDir = path.join(__dirname, "..", "..");
export const uploadsDir = path.join(rootDir, "uploads");
export const supportDir = __dirname;

import serverTemp from "../../server";
import injectThen from "inject-then";
serverTemp.register([{ register: injectThen }]);
export const server = serverTemp;
