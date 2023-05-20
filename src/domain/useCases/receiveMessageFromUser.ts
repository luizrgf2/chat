import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"




export interface ReceiveMessageFromUserUseCaseInterface{
    exec:()=>Promise<Either<ErrorBase,void>>
}