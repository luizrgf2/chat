import { SendMessageToUserUseCase } from "../../app/useCases/sendMessageToUser";
import { PublishSubscribeMessage } from "../../infra/services/publishSubscribe";
import { SendMessageToUserController } from "../controllers/sendMessageToUser";

export class SendMessageToUserFactory{

    static handle(){
        const service = new PublishSubscribeMessage()
        const userCase = new SendMessageToUserUseCase(service)
        const controller = new SendMessageToUserController(userCase)
        return controller
    }

    static handleOnlyUseCase(){
        const service = new PublishSubscribeMessage()
        const userCase = new SendMessageToUserUseCase(service)
        return userCase
    }
}