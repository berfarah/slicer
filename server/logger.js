import winston from "winston";
import path from "path";
import env from "./env";

const logFile = (file) => path.join(__dirname, "..", "log", file);

const logger = new winston.Logger({
  level: "info",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      name: "info-log", filename: logFile("info.log"), level: "info"
    }),
    new (winston.transports.File)({
      name: "error-log", filename: logFile("error.log"), level: "error"
    })
  ]
});

if (env.test) {
  logger.configure({ transports: [] });
}

export default logger;
