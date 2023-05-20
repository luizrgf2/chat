import { MessagePublishInterface } from "../../../domain/entities/messagePublish";
import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";

export interface PublishSubscribeMessageInterface{
    send:(message:MessagePublishInterface)=>Promise<Either<ErrorBase,void>>
    receive:()=>Promise<Either<ErrorBase,void>>
}