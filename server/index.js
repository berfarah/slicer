import Hapi from "hapi";
import Inert from "inert";
import routes from "./routes";
import log from "./logger";
import env from "./env";

const server = new Hapi.Server();
server.connection({
  host: process.env.HOST || "localhost",
  port: process.env.PORT || "1234",
  routes: {
    validate: {
      options: { convert: true }
    }
  }
});

// Inert handles serving static files
server.register(Inert, () => {});

server.route(routes);

if (!env.test) {
  server.start((err) => {
    if (err) {
      log.error(err);
      throw err;
    }
    log.info("Server running at:", server.info.uri)
  });
}

export default server;
