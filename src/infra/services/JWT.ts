import { TokenExpiredError } from "../../app/errors/auth/tokenExpired";
import { JWTInterface } from "../../app/interfaces/services/jwt";
import { JWT_KEY } from "../../config";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import jwt from "jsonwebtoken"

if(!JWT_KEY) throw new Error("JWT_KEY not be is empty!")

export class JWT implements JWTInterface{
    async encode(data: any, durationInMileconds: number) : Promise<Either<ErrorBase, string>>{
        try{
            const token =  jwt.sign(data,JWT_KEY||"",{
                expiresIn: durationInMileconds/1000
            })
            return Right.create(token)
        }catch(e){
            return Left.create(new ErrorBase(String(e),500))
        }
    }

    async decode<T = any>(encodedData: string) : Promise<Either<ErrorBase, T>>{
        try{
            const dataDecoded = jwt.verify(encodedData,JWT_KEY||"") as T
            return Right.create(dataDecoded)
        }catch(e){
            return Left.create(new TokenExpiredError())
        }
    }

}