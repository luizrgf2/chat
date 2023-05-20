import { ErrorBase } from "../errorBase";

export class MessageInvalidError extends ErrorBase{
    constructor(){
        super("Mensagem deve ter de 1 a 200 caracteres!",400)
    }
}