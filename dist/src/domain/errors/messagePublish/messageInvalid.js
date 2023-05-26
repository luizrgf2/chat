"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInvalidError = void 0;
const errorBase_1 = require("../errorBase");
class MessageInvalidError extends errorBase_1.ErrorBase {
    constructor() {
        super("Mensagem deve ter de 1 a 200 caracteres!", 400);
    }
}
exports.MessageInvalidError = MessageInvalidError;
//# sourceMappingURL=messageInvalid.js.map