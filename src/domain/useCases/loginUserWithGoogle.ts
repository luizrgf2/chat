import { UserInterface } from "../entities/user"
import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"

export interface LoginWithGoogleUseCaseInput{
    accessToken:string
}

export interface LoginWithGoogleUseCaseOutput{
    user:UserInterface
    token:string
}


export interface LoginWithGoogleUseCaseInterface{
    exec:(input:LoginWithGoogleUseCaseInput)=>Promise<Either<ErrorBase,LoginWithGoogleUseCaseOutput>>
}