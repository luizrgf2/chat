import { GetAccessTokenFromGoogleUseCaseInput, GetAccessTokenFromGoogleUseCaseInterface, GetAccessTokenFromGoogleUseCaseOutput } from "../../domain/useCases/getAccessTokenFromGoogle";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class GetAccessTokenFromGoogleController implements ControllerInterface{

    constructor(
        private readonly useCase: GetAccessTokenFromGoogleUseCaseInterface
    ){}

    async exec (input: HttpRequest<GetAccessTokenFromGoogleUseCaseInput>) : Promise<HttpResponse<GetAccessTokenFromGoogleUseCaseOutput>>{
        const {body} = input
        if(!body) return  {status:400,error:"Compo da requisição inválido!"} 
        const response = await this.useCase.exec({
            ...body
        })
        if(response.left) return {status:response.left.code,error:response.left.message}
        return {
            status:200,
            body:response.right
        }
    }

}