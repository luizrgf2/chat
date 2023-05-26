"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingMessageMessageBrockerUseCase = void 0;
const either_1 = require("../../domain/errors/either");
class ProcessingMessageMessageBrockerUseCase {
    constructor(publishSubscribe, sendMessageByWebSocket) {
        this.publishSubscribe = publishSubscribe;
        this.sendMessageByWebSocket = sendMessageByWebSocket;
    }
    async closeConsummer() {
        const close = await this.publishSubscribe.closeConsummer();
        if (close.left)
            return either_1.Left.create(close.left);
        return either_1.Right.create(undefined);
    }
    async exec(input) {
        const receiveMessageFunc = async (message) => {
            const sendMessage = await this.sendMessageByWebSocket.exec({
                clientSocketId: input.idClientSocket,
                message: message
            });
            if (sendMessage.left)
                return either_1.Left.create(sendMessage.left);
            return Promise.resolve(either_1.Right.create(undefined));
        };
        const receiveMessage = await this.publishSubscribe.receive({ receveFunc: receiveMessageFunc });
        if (receiveMessage.left)
            return either_1.Left.create(receiveMessage.left);
        return either_1.Right.create(undefined);
    }
}
exports.ProcessingMessageMessageBrockerUseCase = ProcessingMessageMessageBrockerUseCase;
//# sourceMappingURL=processingMessageMessageBrocker.js.map