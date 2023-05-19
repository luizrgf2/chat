import { Request, Response } from "express";
import { GetAccessTokenFromGoogleFactory } from "../../presentation/factory/getAccessTokenFromGoogle";


export class GetAccesTokenFromGoogleExpressController{

    static async exec (req:Request,res:Response){

        const code = req.params.code

        const factory = GetAccessTokenFromGoogleFactory.handle()
        const useCase = await factory.exec({
            body:{code:code}
        })
        if(useCase.error){
            return res.status(useCase.status).json({error:useCase.error})
        }
        return res.status(useCase.status).send(useCase.body)
    }
}