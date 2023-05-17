import { ErrorBase } from "../../../domain/errors/errorBase";

export class TokenExpiredError extends ErrorBase{
    constructor(){
        super("Token inválido ou expirado!",401)
    }
}