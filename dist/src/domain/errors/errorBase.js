"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBase = void 0;
class ErrorBase extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.ErrorBase = ErrorBase;
//# sourceMappingURL=errorBase.js.map