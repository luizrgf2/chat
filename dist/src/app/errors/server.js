"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const errorBase_1 = require("../../domain/errors/errorBase");
class ServerError extends errorBase_1.ErrorBase {
    constructor(message) {
        super(message === undefined ? "Erro no servidor" : message, 500);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server.js.map