export default [
  {
    method: "GET",
    path: "/uploads/{param*}",
    handler: {
      directory: { path: "uploads" }
    }
  }
]
