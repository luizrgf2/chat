"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = void 0;
const errorBase_1 = require("../errorBase");
class EmailAlreadyExistsError extends errorBase_1.ErrorBase {
    constructor() {
        super("O email já existe!", 401);
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
//# sourceMappingURL=emailAlreayExists.js.map