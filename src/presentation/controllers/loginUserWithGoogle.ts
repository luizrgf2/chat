import { LoginWithGoogleUseCaseInput, LoginWithGoogleUseCaseInterface, LoginWithGoogleUseCaseOutput } from "../../domain/useCases/loginUserWithGoogle";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class LoginUserWithGoogleController implements ControllerInterface{

    constructor(
        private readonly useCase: LoginWithGoogleUseCaseInterface
    ){}

    async exec (input: HttpRequest<LoginWithGoogleUseCaseInput>) : Promise<HttpResponse<LoginWithGoogleUseCaseOutput>>{
        const {body} = input
        if(!body) return  {status:400,error:"Compo da requisição inválido!"} 
        const response = await this.useCase.exec({
            access_token:body.access_token
        })
        if(response.left) return {status:response.left.code,error:response.left.message}
        return {
            status:200,
            body:response.right
        }
    }

}