import { TokenExpiredError } from "../../src/app/errors/auth/tokenExpired";
import { JWTInterface } from "../../src/app/interfaces/services/jwt";
import { Either, Left, Right } from "../../src/domain/errors/either";
import { ErrorBase } from "../../src/domain/errors/errorBase";

export class InMemoryJWT implements JWTInterface{
    objectToTest:any
    async encode(data: any, durationInMileconds: number) :Promise<Either<ErrorBase, string>>{
        if(data === "invalid-token") return Right.create("invalid-token")
        return Right.create("valid-token")
    }   

    async decode <T = any>(encodedData: string) : Promise<Either<ErrorBase, T>>{
        if(encodedData === "valid-token") return Right.create(this.objectToTest)
        return Left.create(new TokenExpiredError())
    }



}