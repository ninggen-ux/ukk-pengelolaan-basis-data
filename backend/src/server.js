const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
}

init();
