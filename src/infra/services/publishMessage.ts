import { Channel } from "amqplib";
import { PublishMessageInterface } from "../../app/interfaces/services/publishMessage";
import { RABBITMQ_EXCHANGE_CHATAPP_NAME } from "../../config";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { MessagePublishInterface } from "../../domain/useCases/sendMessageToUser";
import { RabbitMQConnector } from "./RabbitMqConnection";


if(!RABBITMQ_EXCHANGE_CHATAPP_NAME) throw new Error("RABBITMQ_EXCHANGE_CHATAPP_NAME not is empty!")

export class PublishMessage implements PublishMessageInterface{

    async createExchange(ch:Channel):Promise<Either<ErrorBase,void>>{
        try{
            await ch.assertExchange(RABBITMQ_EXCHANGE_CHATAPP_NAME||"","fanout",{
                durable:false
            })
            return Right.create(undefined)
        }catch(e){
            return Left.create(new ErrorBase(String(e),500))
        }
    }

    async sendMessage(ch:Channel,message:MessagePublishInterface):Promise<Either<ErrorBase,void>>{
        try{
            const messageToText = JSON.stringify(message)

            console.log("Message from :"+message.userName)
            console.log("Message from id:"+message.idUser)

            ch.publish(RABBITMQ_EXCHANGE_CHATAPP_NAME||"","",Buffer.from(messageToText))
            return Right.create(undefined)
        }catch(e){
            return Left.create(new ErrorBase(String(e),500))
        }
    }

    async send({idUser,message,userName}: MessagePublishInterface) : Promise<Either<ErrorBase, void>>{
        const connection = await RabbitMQConnector.connect()
        const channel = await connection.createChannel()
        
        const exchangeOrError = await this.createExchange(channel)
        if(exchangeOrError.left) return Left.create(exchangeOrError.left)

        const sendMessageOrError = await this.sendMessage(channel,{idUser,message,userName})
        if(sendMessageOrError.left) return Left.create(sendMessageOrError.left)

        channel.close()
        connection.close()

        return Right.create(undefined)
        
    }

}