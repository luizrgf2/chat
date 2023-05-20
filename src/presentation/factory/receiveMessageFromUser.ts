import { ReceiveMessageFromUserUseCase } from "../../app/useCases/receiveMessageFromUser";
import { PublishSubscribeMessage } from "../../infra/services/publishSubscribe";
import { ReceiveMessageFromUserController } from "../controllers/receiveMessageFromUser";

export class ReceiveMessageFromUserFactory{

    static handle(){
        const service = new PublishSubscribeMessage()
        const userCase = new ReceiveMessageFromUserUseCase(service)
        const controller = new ReceiveMessageFromUserController(userCase)
        return controller
    }

    static handleOnlyUseCase(){
        const service = new PublishSubscribeMessage()
        const userCase = new ReceiveMessageFromUserUseCase(service)
        return userCase
    }
}