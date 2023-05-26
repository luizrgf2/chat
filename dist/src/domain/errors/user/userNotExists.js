"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotExistsError = void 0;
const errorBase_1 = require("../errorBase");
class UserNotExistsError extends errorBase_1.ErrorBase {
    constructor() {
        super("O usuário não existe!", 404);
    }
}
exports.UserNotExistsError = UserNotExistsError;
//# sourceMappingURL=userNotExists.js.map