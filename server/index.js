const express = require("express");
const app = express();

const http = require("http");
const socketio = require("socket.io");
const gameLogic = require('./game-logic');
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = socketio(server)

io.on('connection', client => {
    gameLogic.initializeGame(io, client)
})

server.listen(process.env.PORT || 8000)