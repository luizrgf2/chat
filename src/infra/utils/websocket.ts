import { WebSocketInterface } from "../../app/interfaces/services/webSocket";
import { MessagePublishInterface } from "../../domain/entities/messagePublish";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { io } from "./websocketsConnection";

export class WebSocket implements WebSocketInterface{
    async sendMessageToClient(message: MessagePublishInterface, idClient: string) : Promise<Either<ErrorBase, void>>{
        const wsServer = io
        
        try{
            wsServer.to(idClient).emit("message",message)
            return Right.create(undefined)
        }catch(e){
            return Left.create(new ErrorBase(String(e),500))
        }
    }
}
