import express from "express";
import http from "http";
import { Server } from "socket.io";
import { WEB_SOCKET_PORT } from "../../config";


if(!WEB_SOCKET_PORT) throw new Error("WEB_SOCKET_PORT not be is empty!")


const app = express();

const server = http.createServer(app);

export const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
});



server.listen(WEB_SOCKET_PORT, () => {
  console.log(`Servidor Socket.IO iniciado em http://localhost:${WEB_SOCKET_PORT}`);
});
