import { Request, Response } from "express";
import { SendMessageToUserFactory } from "../../presentation/factory/sendMessageToUser";


export class SendMessageToUserExpressController{

    static async exec (req:Request,res:Response){
        const factory = SendMessageToUserFactory.handle()
        const useCase = await factory.exec({
            body:req.body
        })
        if(useCase.error){
            return res.status(useCase.status).json({error:useCase.error})
        }
        return res.status(useCase.status).send(useCase.body)
    }
}