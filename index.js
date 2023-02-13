"use strict";

const hapi = require("@hapi/hapi");

const init = async () => {
  const server = hapi.server({
    port: 8080,
    host: "127.0.0.1",
  });

  server.route({
    method: "POST",
    path: "/",
    handler: async (request) => {
      const payload = JSON.parse(request.payload);
      console.log("GOT PAYLOAD", request.payload);
      if (payload.challenge) {
        return payload.challenge;
      }
      return "";
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();