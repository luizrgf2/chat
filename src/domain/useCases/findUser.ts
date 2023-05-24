import { UserInterface } from "../entities/user"
import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"

export interface FindUserUseCaseInput{
    idUser:string
}

export interface FindUserUseCaseOutput{
    user:UserInterface
}

export interface FindUserUseCaseInterface{
    exec:(input:FindUserUseCaseInput)=>Promise<Either<ErrorBase,FindUserUseCaseOutput>>
}