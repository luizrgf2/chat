import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";



export interface SendMessageToUserUseCaseInput{
    message:string,
    idUser:string   
}

export interface SendMessageToUserUseCaseOutput{
    message:string
}

export interface SendMessageToUserUseCaseInterface{
    exec:(input:SendMessageToUserUseCaseInput)=>Promise<Either<ErrorBase,SendMessageToUserUseCaseOutput>>
}