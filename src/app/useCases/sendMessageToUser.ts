import { MessagePublishEntity } from "../../domain/entities/messagePublish";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { SendMessageToUserUseCaseInput, SendMessageToUserUseCaseInterface, SendMessageToUserUseCaseOutput} from "../../domain/useCases/sendMessageToUser"
import { PublishMessageInterface } from "../interfaces/services/publishMessage";


export class SendMessageToUserUseCase implements SendMessageToUserUseCaseInterface{
    
    constructor(
        private readonly messagePublisher:PublishMessageInterface
    ){}

    async sendMessage({message}:SendMessageToUserUseCaseInput):Promise<Either<ErrorBase,void>>{
        const send = await this.messagePublisher.send(message)
        if(send.left) return Left.create(send.left)
        return Right.create(undefined)
    }
    
    async exec(input: SendMessageToUserUseCaseInput) : Promise<Either<ErrorBase, SendMessageToUserUseCaseOutput>>{
        const {message:{idUser,message,userName}} = input

        const messageData = MessagePublishEntity.create({
            idUser,
            message,
            userName
        })
        if(messageData.left) return Left.create(messageData.left)

        const send = await this.sendMessage({
            message:{
                idUser,
                message,
                userName
            }
        })        
        if(send.left) return Left.create(send.left)

        return Right.create({
            message:message
        })
    }

}