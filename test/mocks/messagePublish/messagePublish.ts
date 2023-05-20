import { MessagePublishInterface } from "../../../src/domain/useCases/sendMessageToUser";

export const ValidMessagePublish: MessagePublishInterface = {
    idUser:"c804305a-f6ae-11ed-b67e-0242ac120002",
    message:"Olá mensagem válida!",
    userName:"Felipe Gomes"
}

export const MessagePublishWithInvalidId: MessagePublishInterface = {
    idUser:"invalidId",
    message:"Olá mensagem válida!",
    userName:"Felipe Gomes"
}

export const MessagePublishWithInvalidMessage: MessagePublishInterface = {
    idUser:"c804305a-f6ae-11ed-b67e-0242ac120002",
    message:"",
    userName:"Felipe Gomes"
}

export const MessagePublishWithInvalidUserName: MessagePublishInterface = {
    idUser:"c804305a-f6ae-11ed-b67e-0242ac120002",
    message:"Olá nova mensagem",
    userName:""
}