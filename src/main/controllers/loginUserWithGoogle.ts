import { Request, Response } from "express";
import { LoginUserWithGoogleFactory } from "../../presentation/factory/loginUserWithGoogle";


export class LoginUserWithGoogleExpressController{

    static async exec (req:Request,res:Response){
        const factory = LoginUserWithGoogleFactory.handle()
        const useCase = await factory.exec({
            body:req.body
        })
        if(useCase.error){
            return res.status(useCase.status).json({error:useCase.error})
        }
        return res.status(useCase.status).send(useCase.body)
    }
}