import { MessagePublishInterface } from "../../../domain/entities/messagePublish";
import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";

export interface WebSocketInterface{
    sendMessageToClient:(message:MessagePublishInterface,idClient:string)=>Promise<Either<ErrorBase,void>>
}