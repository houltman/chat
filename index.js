var fs = require("fs");
var app = require("express")();
var https = require("https");

// Deploy en server agegar las keys de letsencrypt
/*
var server = https.createServer(
  {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/experto-e.com-0001/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/experto-e.com-0001/cert.pem"
    ),
  },
  app
);
server.listen(3000);
*/

var http = require('http');
var server = http.createServer(app);
server.listen(3000);

var io = require("socket.io").listen(server);

io.sockets.on("connection", function (socket) {
  socket.on("chat-message", function (msg, nick, user, canal) {
    io.emit("chat-message-" + canal, msg, nick, user, canal);
  });

  socket.on("cierra", function (mensage, canal) {
    io.emit("cierra-" + canal, mensage);
  });
});
