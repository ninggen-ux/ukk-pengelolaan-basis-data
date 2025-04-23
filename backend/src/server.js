const Hapi = require("@hapi/hapi");
const routes = require("./routes");

async function init() {
  try {
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
  } catch (err) {
    console.error(err);
  }
}

init();
