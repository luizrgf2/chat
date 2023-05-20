import { PublishSubscribeMessageInterface, ReceiveMessageInput } from "../../src/app/interfaces/services/publishMessage";
import { MessagePublishInterface } from "../../src/domain/entities/messagePublish";
import { Either, Right } from "../../src/domain/errors/either";
import { ErrorBase } from "../../src/domain/errors/errorBase";

export class InMemoryPublishMessage implements PublishSubscribeMessageInterface{
    messages:MessagePublishInterface[] = []
    
    
    async send ({idUser,message,userName}: MessagePublishInterface) : Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)
    }
   
    async receive (input: ReceiveMessageInput) :Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)
    }
}