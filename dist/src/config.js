"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBITMQ_EXCHANGE_CHATAPP_NAME = exports.WEB_SOCKET_PORT = exports.JWT_KEY = exports.RABBITMQ_URI = exports.GOOGLE_CLIENT_SECRET = exports.SERVER_PORT = exports.GOOGLE_AUTH_URI = exports.GOOGLE_REDIRECT_URI = exports.GOOGLE_SCOPES = exports.GOOGLE_CLIENT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.GOOGLE_CLIENT_ID = _a.GOOGLE_CLIENT_ID, exports.GOOGLE_SCOPES = _a.GOOGLE_SCOPES, exports.GOOGLE_REDIRECT_URI = _a.GOOGLE_REDIRECT_URI, exports.GOOGLE_AUTH_URI = _a.GOOGLE_AUTH_URI, exports.SERVER_PORT = _a.SERVER_PORT, exports.GOOGLE_CLIENT_SECRET = _a.GOOGLE_CLIENT_SECRET, exports.RABBITMQ_URI = _a.RABBITMQ_URI, exports.JWT_KEY = _a.JWT_KEY, exports.WEB_SOCKET_PORT = _a.WEB_SOCKET_PORT, exports.RABBITMQ_EXCHANGE_CHATAPP_NAME = _a.RABBITMQ_EXCHANGE_CHATAPP_NAME;
//# sourceMappingURL=config.js.map