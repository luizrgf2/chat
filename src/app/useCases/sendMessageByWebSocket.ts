import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { SendMessageByWebSocketUseCaseInput, SendMessageByWebSocketUseCaseInterface } from "../../domain/useCases/sendMessageByWebSocket";
import { WebSocketInterface } from "../interfaces/services/webSocket";

export class SendMessageByWebSocketUseCase implements SendMessageByWebSocketUseCaseInterface{

    constructor(
        private readonly ws:WebSocketInterface
    ){}

    async exec(input: SendMessageByWebSocketUseCaseInput) : Promise<Either<ErrorBase, void>>{

        const {clientSocketId,message} = input
        
        const sendMessage = await this.ws.sendMessageToClient(message,clientSocketId)
        if(sendMessage.left) return Left.create(sendMessage.left)

        return Right.create(undefined)
    }

}