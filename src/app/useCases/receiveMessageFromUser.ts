import { MessagePublishInterface } from "../../domain/entities/messagePublish";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { ReceiveMessageFromUserUseCaseInterface } from "../../domain/useCases/receiveMessageFromUser";
import { PublishSubscribeMessageInterface } from "../interfaces/services/publishMessage";

export class ReceiveMessageFromUserUseCase implements ReceiveMessageFromUserUseCaseInterface{

    constructor(
        private readonly messagePublisher:PublishSubscribeMessageInterface
    ){}
    
    async receiveMessage(message:MessagePublishInterface):Promise<Either<ErrorBase,void>>{
        console.log("Receive message id :"+message.idUser)
        console.log("Receive message name :"+message.userName)
        console.log("Receive message message :"+message.message)

        return Right.create(undefined)
    }

    async exec () : Promise<Either<ErrorBase, void>>{
        const receive = await this.messagePublisher.receive({receveFunc:this.receiveMessage})
        if(receive.left) return Left.create(receive.left)
        return Right.create(undefined)
    }

}