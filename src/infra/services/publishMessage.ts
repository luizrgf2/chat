import { Channel } from "amqplib";
import { RABBITMQ_EXCHANGE_CHATAPP_NAME } from "../../config";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { RabbitMQConnector } from "./RabbitMqConnection";
import { PublishSubscribeMessageInterface } from "../../app/interfaces/services/publishMessage";
import { MessagePublishInterface } from "../../domain/entities/messagePublish";


if(!RABBITMQ_EXCHANGE_CHATAPP_NAME) throw new Error("RABBITMQ_EXCHANGE_CHATAPP_NAME not is empty!")

export class PublishMessage implements PublishSubscribeMessageInterface{

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

    async createQueue(ch:Channel):Promise<Either<ErrorBase,string>>{
        try{
            const {queue} = await ch.assertQueue("",{
                exclusive:true,
                durable:false
            })
            return Right.create(queue)
        }catch(e){
            return Left.create(new ErrorBase(String(e),500))
        }
    }

    async sendMessage(ch:Channel,message:MessagePublishInterface):Promise<Either<ErrorBase,void>>{
        try{
            const messageToText = JSON.stringify(message)

            console.log("Send message from :"+message.userName)
            console.log("Send message from id:"+message.idUser)

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

    async receive() : Promise<Either<ErrorBase, void>>{
        const connection = await RabbitMQConnector.connect()
        const channel = await connection.createChannel()
        
        const exchangeOrError = await this.createExchange(channel)
        if(exchangeOrError.left) {
            await channel.close();
            await connection.close();
            return Left.create(exchangeOrError.left)
        }

        const queueOrError = await this.createQueue(channel)
        if(queueOrError.left) {
            await channel.close();
            await connection.close();
            return Left.create(queueOrError.left)
        }

        await channel.bindQueue(queueOrError.right,RABBITMQ_EXCHANGE_CHATAPP_NAME||"","")

        channel.consume(queueOrError.right,message=>{
            if(message){
                const content = JSON.parse(message.content.toString())

                console.log("Receive message from :"+content.userName)
                console.log("Receive message from id:"+content.idUser)

                channel.ack(message)
            }


        },{noAck:true})

        return Right.create(undefined)
    }


}