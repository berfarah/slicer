import handleSlice from "./handle/slice";
import schema from "./schema";

export default (basePath) => [
  {
    method: "POST",
    path: "/",
    handler: handleSlice(basePath),
    config: {
      payload: { output: "file", maxBytes: 5*1024*1024 },
      validate: { payload: schema }
    }
  },
  {
    method: "GET",
    path: "/uploads/{param*}",
    handler: {
      directory: { path: "uploads" }
    }
  }
]
