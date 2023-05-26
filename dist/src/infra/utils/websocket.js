"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocket = void 0;
const either_1 = require("../../domain/errors/either");
const errorBase_1 = require("../../domain/errors/errorBase");
const websocketsConnection_1 = require("./websocketsConnection");
class WebSocket {
    async sendMessageToClient(message, idClient) {
        const wsServer = websocketsConnection_1.io;
        try {
            wsServer.to(idClient).emit("message", message);
            return either_1.Right.create(undefined);
        }
        catch (e) {
            return either_1.Left.create(new errorBase_1.ErrorBase(String(e), 500));
        }
    }
}
exports.WebSocket = WebSocket;
//# sourceMappingURL=websocket.js.map