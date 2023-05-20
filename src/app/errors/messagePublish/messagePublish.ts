import { ErrorBase } from "../../../domain/errors/errorBase";

export class MessagePusblishError extends ErrorBase{
    constructor(message?:string,code?:number){
        const messageToSend = message === undefined ? "Erro ao enviar mensagem!" : message
        const codeToSend = code === undefined ? 500 : code
        super(messageToSend,codeToSend)
    }
}