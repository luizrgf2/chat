import { ReceiveMessageFromUserUseCaseInterface } from "../../domain/useCases/receiveMessageFromUser";
import { ControllerInterface } from "../interfaces/controller";
import { HttpResponse } from "../interfaces/http";

export class ReceiveMessageFromUserController implements ControllerInterface{

    constructor(
        private readonly useCase:ReceiveMessageFromUserUseCaseInterface
    ){}

    async exec() : Promise<HttpResponse<void>>{
        
        const res = await this.useCase.exec()
        if(res.left) return {status:res.left.code,error:res.left.message}

        return {status:200}
    }

}