"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdInvalidError = void 0;
const errorBase_1 = require("../errorBase");
class IdInvalidError extends errorBase_1.ErrorBase {
    constructor() {
        super("O id não está no padrão UUID.", 400);
    }
}
exports.IdInvalidError = IdInvalidError;
//# sourceMappingURL=idInvalid.js.map