"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryJWT = void 0;
const tokenExpired_1 = require("../../src/app/errors/auth/tokenExpired");
const either_1 = require("../../src/domain/errors/either");
class InMemoryJWT {
    async encode(data, durationInMileconds) {
        if (data === "invalid-token")
            return either_1.Right.create("invalid-token");
        return either_1.Right.create("valid-token");
    }
    async decode(encodedData) {
        if (encodedData === "valid-token")
            return either_1.Right.create(this.objectToTest);
        return either_1.Left.create(new tokenExpired_1.TokenExpiredError());
    }
}
exports.InMemoryJWT = InMemoryJWT;
//# sourceMappingURL=jwt.js.map