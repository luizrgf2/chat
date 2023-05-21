import {Request,Response,NextFunction} from "express"
import {JWT} from "../../../infra/services/JWT"
import { TokenExpiredError } from "jsonwebtoken"



export async function PrivateRouteMiddleware(req:Request,res:Response,next:NextFunction){

    const headers = req.headers
    const authorization = headers.authorization

    if(!authorization) return res.status(401).send()

    const jwt = new JWT()
    
    const decoded = await jwt.decode(authorization)
    if(decoded.left){
        if(decoded.left instanceof TokenExpiredError){
            return res.status(401).send({error:decoded.left.message})
        }else{
            return res.status(401)
        }
    }

    const id = decoded.right.id as string
    req.headers.authorization = id
    next()
}