import { Request, Response } from "express";
import { FindUserFactory } from "../../presentation/factory/findUser";


export class FindUserExpressController{

    static async exec (req:Request,res:Response){
        const idUser = req.headers.authorization
        const factory = FindUserFactory.handle()
        const useCase = await factory.exec({
            body:{
                idUser:idUser||""
            }
        })
        if(useCase.error){
            return res.status(useCase.status).json({error:useCase.error})
        }
        return res.status(useCase.status).send(useCase.body)
    }
}