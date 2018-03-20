const express = require("express");
const server = express();


server.use(express.static("public"));
server.set("view engine", "ejs");
server.set("port", process.env.PORT || 3000);
// Import routes
require("./routes/index")(server);
server.listen(3000, function () {
    console.log('Server listening at: ' + "http://localhost:" + server.get('port') + "/");
});