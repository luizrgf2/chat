import { MessagePublishInterface } from "../entities/messagePublish";
import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";


export interface SendMessageByWebSocketUseCaseInput{
    clientSocketId:string,
    message:MessagePublishInterface
}

export interface SendMessageByWebSocketUseCaseInterface{
    exec:(input:SendMessageByWebSocketUseCaseInput)=>Promise<Either<ErrorBase,void>>
}