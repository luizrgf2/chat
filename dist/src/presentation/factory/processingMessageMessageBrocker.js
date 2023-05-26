"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingMessageMessageBrockerFactory = void 0;
const processingMessageMessageBrocker_1 = require("../../app/useCases/processingMessageMessageBrocker");
const sendMessageByWebSocket_1 = require("../../app/useCases/sendMessageByWebSocket");
const publishSubscribe_1 = require("../../infra/services/publishSubscribe");
const websocket_1 = require("../../infra/utils/websocket");
class ProcessingMessageMessageBrockerFactory {
    static handle() {
        const service = new publishSubscribe_1.PublishSubscribeMessage();
        const service2 = new websocket_1.WebSocket();
        const useCaseAux = new sendMessageByWebSocket_1.SendMessageByWebSocketUseCase(service2);
        const useCase = new processingMessageMessageBrocker_1.ProcessingMessageMessageBrockerUseCase(service, useCaseAux);
        return useCase;
    }
}
exports.ProcessingMessageMessageBrockerFactory = ProcessingMessageMessageBrockerFactory;
//# sourceMappingURL=processingMessageMessageBrocker.js.map