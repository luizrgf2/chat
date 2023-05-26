"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const tokenExpired_1 = require("../../app/errors/auth/tokenExpired");
const config_1 = require("../../config");
const either_1 = require("../../domain/errors/either");
const errorBase_1 = require("../../domain/errors/errorBase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!config_1.JWT_KEY)
    throw new Error("JWT_KEY not be is empty!");
class JWT {
    async encode(data, durationInMileconds) {
        try {
            const token = jsonwebtoken_1.default.sign(data, config_1.JWT_KEY || "", {
                expiresIn: durationInMileconds / 1000
            });
            return either_1.Right.create(token);
        }
        catch (e) {
            return either_1.Left.create(new errorBase_1.ErrorBase(String(e), 500));
        }
    }
    async decode(encodedData) {
        try {
            const dataDecoded = jsonwebtoken_1.default.verify(encodedData, config_1.JWT_KEY || "");
            return either_1.Right.create(dataDecoded);
        }
        catch (e) {
            return either_1.Left.create(new tokenExpired_1.TokenExpiredError());
        }
    }
}
exports.JWT = JWT;
//# sourceMappingURL=JWT.js.map