import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { GetAccessTokenFromGoogleUseCaseInput, GetAccessTokenFromGoogleUseCaseInterface, GetAccessTokenFromGoogleUseCaseOutput } from "../../domain/useCases/getAccessTokenFromGoogle";
import { GoogleOauth2Interface } from "../interfaces/services/google";

export class GetAccessTokenFromGoogleUseCase implements GetAccessTokenFromGoogleUseCaseInterface{
    
    constructor(
        private readonly google:GoogleOauth2Interface
    ){}
 
    async exec(input: GetAccessTokenFromGoogleUseCaseInput) : Promise<Either<ErrorBase, GetAccessTokenFromGoogleUseCaseOutput>>{
        const {code} = input
        const getTokens = await this.google.getTokens(code)
        if(getTokens.left) return Left.create(getTokens.left)
        const accessToken = getTokens.right.access_token
        return Right.create({
            accessToken:accessToken
        })
    }

}