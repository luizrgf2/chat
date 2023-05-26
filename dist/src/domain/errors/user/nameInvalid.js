"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameInvalidError = void 0;
const errorBase_1 = require("../errorBase");
class NameInvalidError extends errorBase_1.ErrorBase {
    constructor() {
        super("Nome deve ter de 4 a 60 caracteres!", 400);
    }
}
exports.NameInvalidError = NameInvalidError;
//# sourceMappingURL=nameInvalid.js.map