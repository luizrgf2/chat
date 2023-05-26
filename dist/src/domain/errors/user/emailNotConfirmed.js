"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotConfirmedError = void 0;
const errorBase_1 = require("../errorBase");
class EmailNotConfirmedError extends errorBase_1.ErrorBase {
    constructor() {
        super("Email não confirmado pelo usuário!", 401);
    }
}
exports.EmailNotConfirmedError = EmailNotConfirmedError;
//# sourceMappingURL=emailNotConfirmed.js.map