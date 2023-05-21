import { Request, Response } from "express";
import { SendMessageToUserFactory } from "../../presentation/factory/sendMessageToUser";


export class SendMessageToUserExpressController{

    static async exec (req:Request,res:Response){
        const id = req.headers.authorization||""
        const factory = SendMessageToUserFactory.handle()
        const useCase = await factory.exec({
            body:{
                idUser:id,
                message:req.body.message
            }
        })
        if(useCase.error){
            return res.status(useCase.status).json({error:useCase.error})
        }
        return res.status(useCase.status).send(useCase.body)
    }
}