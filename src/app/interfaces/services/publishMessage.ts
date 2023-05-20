import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";
import { MessagePublishInterface } from "../../../domain/useCases/sendMessageToUser";

export interface PublishMessageInterface{
    send:(message:MessagePublishInterface)=>Promise<Either<ErrorBase,void>>
}