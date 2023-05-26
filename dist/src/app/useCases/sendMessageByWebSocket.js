"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageByWebSocketUseCase = void 0;
const either_1 = require("../../domain/errors/either");
class SendMessageByWebSocketUseCase {
    constructor(ws) {
        this.ws = ws;
    }
    async exec(input) {
        const { clientSocketId, message } = input;
        const sendMessage = await this.ws.sendMessageToClient(message, clientSocketId);
        if (sendMessage.left)
            return either_1.Left.create(sendMessage.left);
        return either_1.Right.create(undefined);
    }
}
exports.SendMessageByWebSocketUseCase = SendMessageByWebSocketUseCase;
//# sourceMappingURL=sendMessageByWebSocket.js.map