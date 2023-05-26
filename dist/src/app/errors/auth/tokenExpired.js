"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredError = void 0;
const errorBase_1 = require("../../../domain/errors/errorBase");
class TokenExpiredError extends errorBase_1.ErrorBase {
    constructor() {
        super("Token inválido ou expirado!", 401);
    }
}
exports.TokenExpiredError = TokenExpiredError;
//# sourceMappingURL=tokenExpired.js.map