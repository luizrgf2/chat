import amqtlib from "amqplib"
import { RABBITMQ_URI } from "../../config";


if(!RABBITMQ_URI) throw new Error("RABBITMQ_URL not is empty!")


export class RabbitMQConnector{
    static async connect(){
        const conn = await amqtlib.connect(RABBITMQ_URI||"")
        return conn
    }
}