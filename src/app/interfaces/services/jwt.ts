import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";

export interface JWTInterface{
    encode:(data:any,durationInMileconds:number)=>Promise<Either<ErrorBase,string>>
    decode:<T=any>(encodedData:string)=>Promise<Either<ErrorBase,T>>
}