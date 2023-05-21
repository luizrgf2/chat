import { SendMessageToUserUseCaseInput, SendMessageToUserUseCaseInterface, SendMessageToUserUseCaseOutput } from "../../domain/useCases/sendMessageToUser";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class SendMessageToUserController implements ControllerInterface{

    constructor(
        private readonly useCase:SendMessageToUserUseCaseInterface
    ){}

    async exec(input: HttpRequest<SendMessageToUserUseCaseInput>) : Promise<HttpResponse<SendMessageToUserUseCaseOutput>>{
        const {body} = input
        if(!body) return  {status:400,error:"Compo da requisição inválido!"} 

        const res = await this.useCase.exec(body)
        if(res.left) return {status:res.left.code,error:res.left.message}

        return {body:{message:body.message},status:200}
    }

}