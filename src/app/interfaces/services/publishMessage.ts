import { MessagePublishInterface } from "../../../domain/entities/messagePublish";
import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";

export interface ReceiveMessageInput{
    receveFunc:(message:MessagePublishInterface)=>Promise<Either<ErrorBase,void>>
}

export interface PublishSubscribeMessageInterface{
    send:(message:MessagePublishInterface)=>Promise<Either<ErrorBase,void>>
    receive:(input:ReceiveMessageInput)=>Promise<Either<ErrorBase,void>>
}