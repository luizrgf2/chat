import { SendMessageToUserUseCase } from "../../app/useCases/sendMessageToUser";
import { PrismaUserRepository } from "../../infra/repository/prismaUser";
import { PublishSubscribeMessage } from "../../infra/services/publishSubscribe";
import { SendMessageToUserController } from "../controllers/sendMessageToUser";

export class SendMessageToUserFactory{

    static handle(){
        const service = new PublishSubscribeMessage()
        const repo = new PrismaUserRepository()
        const userCase = new SendMessageToUserUseCase(service,repo)
        const controller = new SendMessageToUserController(userCase)
        return controller
    }

    static handleOnlyUseCase(){
        const service = new PublishSubscribeMessage()
        const repo = new PrismaUserRepository()
        const userCase = new SendMessageToUserUseCase(service,repo)
        return userCase
    }
}