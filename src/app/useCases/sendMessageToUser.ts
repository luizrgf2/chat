import { MessagePublishEntity, MessagePublishInterface } from "../../domain/entities/messagePublish";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { SendMessageToUserUseCaseInput, SendMessageToUserUseCaseInterface, SendMessageToUserUseCaseOutput} from "../../domain/useCases/sendMessageToUser"
import { UserRepositoryInterface } from "../interfaces/repository/user";
import { PublishSubscribeMessageInterface } from "../interfaces/services/publishMessage";


export class SendMessageToUserUseCase implements SendMessageToUserUseCaseInterface{
    
    constructor(
        private readonly messagePublisher:PublishSubscribeMessageInterface,
        private readonly userRepo:UserRepositoryInterface
    ){}

    async sendMessage(message:MessagePublishInterface):Promise<Either<ErrorBase,void>>{
        const send = await this.messagePublisher.send(message)
        if(send.left) return Left.create(send.left)
        return Right.create(undefined)
    }
    
    async exec(input: SendMessageToUserUseCaseInput) : Promise<Either<ErrorBase, SendMessageToUserUseCaseOutput>>{
        const {message,idUser} = input

        const userOrError = await this.userRepo.findUserById(idUser)
        if(userOrError.left) return Left.create(userOrError.left)

        const messageData = MessagePublishEntity.create({
            idUser:userOrError.right.id,
            userName:userOrError.right.name,
            message:message
        })
        if(messageData.left) return Left.create(messageData.left)

        const send = await this.sendMessage({
            idUser:userOrError.right.id,
            message:message,
            userName:userOrError.right.name
        })        
        if(send.left) return Left.create(send.left)

        return Right.create({
            message:message
        })
    }

}