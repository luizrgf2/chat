import { Either, Left, Right } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";
import { IdInvalidError } from "../errors/messagePublish/idInvalid";
import { MessageInvalidError } from "../errors/messagePublish/messageInvalid";
import { NameInvalidError } from "../errors/user/nameInvalid";

export interface MessagePublishInterface{
    idUser:string,
    userName:string,
    message:string
}

export class MessagePublishEntity{

    message:MessagePublishInterface

    constructor(
        message:MessagePublishInterface
    ){
        this.message = message
    }

    isValidName():boolean{
        if(!this.message.userName) return false
        return this.message.userName.length >= 4 && this.message.userName.length <= 60;
    }

    isValidUUID(): boolean {
        if(!this.message.idUser) return false
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(this.message.idUser);
    }

    isValidMessage():boolean {
        if(!this.message.message) return false
        return this.message.message.length > 0 || this.message.message.length < 200
    }

    static create(message:MessagePublishInterface):Either<ErrorBase,MessagePublishEntity>{
        const messageData = new MessagePublishEntity(message)

        const isValidUUID = messageData.isValidUUID()
        const isValidName = messageData.isValidName()
        const isValidMessage = messageData.isValidMessage()

        if(!isValidUUID) return Left.create(new IdInvalidError())
        if(!isValidName) return Left.create(new NameInvalidError())
        if(!isValidMessage) return Left.create(new MessageInvalidError())

        return Right.create(messageData)
    }

    static createWithoutValidations(message:MessagePublishInterface):MessagePublishEntity{
        const messageData = new MessagePublishEntity(message)
        return messageData
    }
}