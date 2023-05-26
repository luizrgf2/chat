"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInvalidError = void 0;
const errorBase_1 = require("../errorBase");
class PasswordInvalidError extends errorBase_1.ErrorBase {
    constructor() {
        super("Senha deve ter pelo menos uma letra maiúscula e deve estar entre 8 e 15 caracteres!", 400);
    }
}
exports.PasswordInvalidError = PasswordInvalidError;
//# sourceMappingURL=passwordInvalid.js.map