"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInvalidError = void 0;
const errorBase_1 = require("../errorBase");
class EmailInvalidError extends errorBase_1.ErrorBase {
    constructor() {
        super("Email inválido!", 400);
    }
}
exports.EmailInvalidError = EmailInvalidError;
//# sourceMappingURL=emailInvalid.js.map