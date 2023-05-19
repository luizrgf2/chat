import { Either } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"

export interface GetAccessTokenFromGoogleUseCaseInput{
    code:string
}

export interface GetAccessTokenFromGoogleUseCaseOutput{
    accessToken:string
}


export interface GetAccessTokenFromGoogleUseCaseInterface{
    exec:(input:GetAccessTokenFromGoogleUseCaseInput)=>Promise<Either<ErrorBase,GetAccessTokenFromGoogleUseCaseOutput>>
}