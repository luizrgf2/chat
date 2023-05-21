import { ReceiveMessageFromUserUseCase } from "../../app/useCases/receiveMessageFromUser";
import { PublishSubscribeMessage } from "../../infra/services/publishSubscribe";
import { WebSocket } from "../../infra/services/webSocket";

export class ReceiveMessageFromUserFactory{

    static handle(){
        const service = new PublishSubscribeMessage()
        const service2 = new WebSocket()
        const userCase = new ReceiveMessageFromUserUseCase(service,service2)
        return userCase
    }
}