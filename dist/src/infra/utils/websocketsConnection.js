"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const config_1 = require("../../config");
if (!config_1.WEB_SOCKET_PORT)
    throw new Error("WEB_SOCKET_PORT not be is empty!");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
server.listen(config_1.WEB_SOCKET_PORT, () => {
    console.log(`Servidor Socket.IO iniciado em http://localhost:${config_1.WEB_SOCKET_PORT}`);
});
//# sourceMappingURL=websocketsConnection.js.map