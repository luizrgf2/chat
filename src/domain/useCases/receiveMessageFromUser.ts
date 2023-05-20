import { MessagePublishInterface } from "../entities/messagePublish"
import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"

export interface ReceiveMessageFromUserUseCaseInput{
    message:MessagePublishInterface
}


export interface ReceiveMessageFromUserUseCaseInterface{
    exec:(input:ReceiveMessageFromUserUseCaseInput)=>Promise<Either<ErrorBase,void>>
}