import { UserInterface } from "../entities/user"
import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"

export interface CreateUserWithGoogleUseCaseInput{
    access_token:string
}

export interface CreateUserWithGoogleUseCaseOutput{
    user:UserInterface
}


export interface CreateUserWithGoogleUseCaseInterface{
    exec:(input:CreateUserWithGoogleUseCaseInput)=>Promise<Either<ErrorBase,CreateUserWithGoogleUseCaseOutput>>
}