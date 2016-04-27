import handleUpload from "./handle/upload";

export default [
  {
    method: "POST",
    path: "/",
    handler: (req, reply) => {
      const path = handleUpload(req.payload.image);
      reply(path);
    },
    config: {
      payload: { output: "file" }
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
