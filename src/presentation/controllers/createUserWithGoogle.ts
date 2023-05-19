import { CreateUserWithGoogleUseCaseInput, CreateUserWithGoogleUseCaseInterface,CreateUserWithGoogleUseCaseOutput } from "../../domain/useCases/createUserWithGoogle";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class CreateUserWithGoogleController implements ControllerInterface{

    constructor(
        private readonly useCase: CreateUserWithGoogleUseCaseInterface
    ){}

    async exec (input: HttpRequest<CreateUserWithGoogleUseCaseInput>) : Promise<HttpResponse<CreateUserWithGoogleUseCaseOutput>>{
        const {body} = input
        if(!body) return  {status:400,error:"Compo da requisição inválido!"} 
        const response = await this.useCase.exec({
            ...body
        })
        if(response.left) return {status:response.left.code,error:response.left.message}
        return {
            status:201,
            body:response.right
        }
    }

}