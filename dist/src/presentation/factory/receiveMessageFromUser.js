"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveMessageFromUserFactory = void 0;
const receiveMessageFromUser_1 = require("../../app/useCases/receiveMessageFromUser");
const publishSubscribe_1 = require("../../infra/services/publishSubscribe");
const webSocket_1 = require("../../infra/services/webSocket");
class ReceiveMessageFromUserFactory {
    static handle() {
        const service = new publishSubscribe_1.PublishSubscribeMessage();
        const service2 = new webSocket_1.WebSocket();
        const userCase = new receiveMessageFromUser_1.ReceiveMessageFromUserUseCase(service, service2);
        return userCase;
    }
}
exports.ReceiveMessageFromUserFactory = ReceiveMessageFromUserFactory;
//# sourceMappingURL=receiveMessageFromUser.js.map