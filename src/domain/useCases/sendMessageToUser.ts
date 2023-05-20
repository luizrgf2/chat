import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";

export interface MessagePublishInterface{
    idUser:string,
    userName:string,
    message:string
}

export interface SendMessageToUserUseCaseInput{
    message:MessagePublishInterface   
}

export interface SendMessageToUserUseCaseOutput{
    message:string
}

export interface SendMessageToUserUseCaseInterface{
    exec:(input:SendMessageToUserUseCaseInput)=>Promise<Either<ErrorBase,SendMessageToUserUseCaseOutput>>
}