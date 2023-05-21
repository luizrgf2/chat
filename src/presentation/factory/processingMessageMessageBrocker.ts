import { ProcessingMessageMessageBrockerUseCase } from "../../app/useCases/processingMessageMessageBrocker";
import { SendMessageByWebSocketUseCase } from "../../app/useCases/sendMessageByWebSocket";
import { PublishSubscribeMessage } from "../../infra/services/publishSubscribe";
import { WebSocket } from "../../infra/utils/websocket";

export class ProcessingMessageMessageBrockerFactory{

    static handle(){
        const service = new PublishSubscribeMessage()
        const service2 = new WebSocket()

        const useCaseAux = new SendMessageByWebSocketUseCase(service2)

        const useCase = new ProcessingMessageMessageBrockerUseCase(service,useCaseAux)
        return useCase
    }

}