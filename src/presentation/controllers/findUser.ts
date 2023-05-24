import { FindUserUseCaseInput, FindUserUseCaseInterface, FindUserUseCaseOutput } from "../../domain/useCases/findUser";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class FindUserController implements ControllerInterface{

    constructor(
        private readonly useCase: FindUserUseCaseInterface
    ){}

    async exec (input: HttpRequest<FindUserUseCaseInput>) : Promise<HttpResponse<FindUserUseCaseOutput>>{
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