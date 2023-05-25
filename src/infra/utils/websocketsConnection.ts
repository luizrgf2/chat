import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

export const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
});



const port = 8080;
server.listen(port, () => {
  console.log(`Servidor Socket.IO iniciado em http://localhost:${port}`);
});
