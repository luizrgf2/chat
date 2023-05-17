import { ErrorBase } from "../../domain/errors/errorBase";

export class ServerError extends ErrorBase{
    constructor(message?:string){
        super(message === undefined ? "Erro no servidor" : message,500)
    }
}