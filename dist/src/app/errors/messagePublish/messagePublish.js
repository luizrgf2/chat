"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePusblishError = void 0;
const errorBase_1 = require("../../../domain/errors/errorBase");
class MessagePusblishError extends errorBase_1.ErrorBase {
    constructor(message, code) {
        const messageToSend = message === undefined ? "Erro ao enviar mensagem!" : message;
        const codeToSend = code === undefined ? 500 : code;
        super(messageToSend, codeToSend);
    }
}
exports.MessagePusblishError = MessagePusblishError;
//# sourceMappingURL=messagePublish.js.map