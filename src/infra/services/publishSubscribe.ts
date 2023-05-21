import { Channel, Connection } from "amqplib";
import { RABBITMQ_EXCHANGE_CHATAPP_NAME } from "../../config";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { RabbitMQConnector } from "./RabbitMqConnection";
import { PublishSubscribeMessageInterface, ReceiveMessageInput } from "../../app/interfaces/services/publishMessage";
import { MessagePublishInterface } from "../../domain/entities/messagePublish";


if(!RABBITMQ_EXCHANGE_CHATAPP_NAME) throw new Error("RABBITMQ_EXCHANGE_CHATAPP_NAME not is empty!")



export class PublishSubscribeMessage implements PublishSubscribeMessageInterface{

    connectionConsummer?:Connection
    channelConsummer?:Channel

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

        setTimeout(async ()=>{
            await channel.close()
            await connection.close()
        },1000)

        return Right.create(undefined)
        
    }

    async closeConsummer():Promise<Either<ErrorBase,void>>{

        try{
            if(this.channelConsummer){
                await this.channelConsummer.close()
            }
            if(this.connectionConsummer){
                await this.connectionConsummer.close()
            }
        }catch(e){
            return Left.create(new ErrorBase("Error to disconnect",500))
        }
        return Right.create(undefined)
    }

    async receive({receveFunc}:ReceiveMessageInput) : Promise<Either<ErrorBase, void>>{
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

                receveFunc(content).then(value=>{
                    if(value.left){
                        channel.nack(message,false,true)
                    }else{
                        channel.ack(message)
                    }
                })
            }


        },{noAck:false})

        return Right.create(undefined)
    }


}