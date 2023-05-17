import { UserInterface } from "../entities/user"
import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"

export interface LoginWithGoogleUseCaseInput{
    access_token:string
}

export interface LoginWithGoogleUseCaseOutput{
    user:UserInterface
}


export interface LoginWithGoogleUseCaseInterface{
    exec:(input:LoginWithGoogleUseCaseInput)=>Promise<Either<ErrorBase,LoginWithGoogleUseCaseOutput>>
}