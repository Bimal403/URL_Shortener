const http = require("http");
const app = require("./config/express.config.js");

const server = http.createServer(app);
server.listen(3005, "localhost", (err) => {
  if (!err) {
    console.log("Server is running");
    console.log("Press Ctrl + C to end sever");
  }
});
