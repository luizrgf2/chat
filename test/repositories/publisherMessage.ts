import { PublishMessageInterface } from "../../src/app/interfaces/services/publishMessage";
import { Either, Right } from "../../src/domain/errors/either";
import { ErrorBase } from "../../src/domain/errors/errorBase";
import { MessagePublishInterface } from "../../src/domain/useCases/sendMessageToUser";

export class InMemoryPublishMessage implements PublishMessageInterface{

    messages:MessagePublishInterface[] = []

    async send ({idUser,message,userName}: MessagePublishInterface) : Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)
    }
}