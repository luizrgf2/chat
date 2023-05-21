import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";


export interface ProcessingMessageMessageBrockerUseCaseInput{
    idClientSocket:string
}

export interface ProcessingMessageMessageBrockerUseCaseInterface{
    closeConsummer:()=>Promise<Either<ErrorBase,void>>
    exec:(input:ProcessingMessageMessageBrockerUseCaseInput)=>Promise<Either<ErrorBase,void>>
}