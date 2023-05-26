"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWrongError = void 0;
const errorBase_1 = require("../errorBase");
class AuthWrongError extends errorBase_1.ErrorBase {
    constructor() {
        super("Email ou senha errado!", 401);
    }
}
exports.AuthWrongError = AuthWrongError;
//# sourceMappingURL=authWrong.js.map