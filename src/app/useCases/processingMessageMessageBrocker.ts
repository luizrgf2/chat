import { MessagePublishInterface } from "../../domain/entities/messagePublish";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { ProcessingMessageMessageBrockerUseCaseInput, ProcessingMessageMessageBrockerUseCaseInterface } from "../../domain/useCases/processingMessageMessageBrocker";
import { SendMessageByWebSocketUseCaseInterface } from "../../domain/useCases/sendMessageByWebSocket";
import { PublishSubscribeMessageInterface } from "../interfaces/services/publishMessage";

export class ProcessingMessageMessageBrockerUseCase implements ProcessingMessageMessageBrockerUseCaseInterface{
    
    constructor(
        private readonly publishSubscribe:PublishSubscribeMessageInterface,
        private readonly sendMessageByWebSocket:SendMessageByWebSocketUseCaseInterface
    ){}
    
    async closeConsummer () : Promise<Either<ErrorBase, void>>{
        const close = await this.publishSubscribe.closeConsummer()
        if(close.left) return Left.create(close.left)
        return Right.create(undefined)
    }

    async exec(input:ProcessingMessageMessageBrockerUseCaseInput) : Promise<Either<ErrorBase, void>>{

        const receiveMessageFunc = async (message: MessagePublishInterface) : Promise<Either<ErrorBase,void>>=>{
            const sendMessage = await this.sendMessageByWebSocket.exec({
                clientSocketId:input.idClientSocket,
                message:message
            })
            if(sendMessage.left) return Left.create(sendMessage.left)
            
            return Promise.resolve(Right.create(undefined))
        }

        const receiveMessage = await this.publishSubscribe.receive({receveFunc:receiveMessageFunc})
        if(receiveMessage.left) return Left.create(receiveMessage.left)

        return Right.create(undefined)
    }
}