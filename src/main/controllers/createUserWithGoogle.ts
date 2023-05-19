import { Request, Response } from "express";
import { CreateUserWithGoogleFactory } from "../../presentation/factory/createUserWithGoogle";


export class CreateUserWithGoogleExpressController{

    static async exec (req:Request,res:Response){
        const factory = CreateUserWithGoogleFactory.handle()
        const useCase = await factory.exec({
            body:req.body
        })
        if(useCase.error){
            return res.status(useCase.status).json({error:useCase.error})
        }
        return res.status(useCase.status).send(useCase.body)
    }
}