"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConnector = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("../../config");
if (!config_1.RABBITMQ_URI)
    throw new Error("RABBITMQ_URL not is empty!");
class RabbitMQConnector {
    static async connect() {
        const conn = await amqplib_1.default.connect(config_1.RABBITMQ_URI || "");
        return conn;
    }
}
exports.RabbitMQConnector = RabbitMQConnector;
//# sourceMappingURL=RabbitMqConnection.js.map