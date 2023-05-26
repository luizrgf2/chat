"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishSubscribeMessage = void 0;
const config_1 = require("../../config");
const either_1 = require("../../domain/errors/either");
const errorBase_1 = require("../../domain/errors/errorBase");
const RabbitMqConnection_1 = require("./RabbitMqConnection");
if (!config_1.RABBITMQ_EXCHANGE_CHATAPP_NAME)
    throw new Error("RABBITMQ_EXCHANGE_CHATAPP_NAME not is empty!");
class PublishSubscribeMessage {
    async createExchange(ch) {
        try {
            await ch.assertExchange(config_1.RABBITMQ_EXCHANGE_CHATAPP_NAME || "", "fanout", {
                durable: false
            });
            return either_1.Right.create(undefined);
        }
        catch (e) {
            return either_1.Left.create(new errorBase_1.ErrorBase(String(e), 500));
        }
    }
    async createQueue(ch) {
        try {
            const { queue } = await ch.assertQueue("", {
                exclusive: true,
                durable: false
            });
            return either_1.Right.create(queue);
        }
        catch (e) {
            return either_1.Left.create(new errorBase_1.ErrorBase(String(e), 500));
        }
    }
    async sendMessage(ch, message) {
        try {
            const messageToText = JSON.stringify(message);
            console.log("Send message from :" + message.userName);
            console.log("Send message from id:" + message.idUser);
            ch.publish(config_1.RABBITMQ_EXCHANGE_CHATAPP_NAME || "", "", Buffer.from(messageToText));
            return either_1.Right.create(undefined);
        }
        catch (e) {
            return either_1.Left.create(new errorBase_1.ErrorBase(String(e), 500));
        }
    }
    async send({ idUser, message, userName }) {
        const connection = await RabbitMqConnection_1.RabbitMQConnector.connect();
        const channel = await connection.createChannel();
        const exchangeOrError = await this.createExchange(channel);
        if (exchangeOrError.left)
            return either_1.Left.create(exchangeOrError.left);
        const sendMessageOrError = await this.sendMessage(channel, { idUser, message, userName });
        if (sendMessageOrError.left)
            return either_1.Left.create(sendMessageOrError.left);
        setTimeout(async () => {
            await channel.close();
            await connection.close();
        }, 1000);
        return either_1.Right.create(undefined);
    }
    async closeConsummer() {
        try {
            if (this.channelConsummer) {
                await this.channelConsummer.close();
            }
            if (this.connectionConsummer) {
                await this.connectionConsummer.close();
            }
        }
        catch (e) {
            return either_1.Left.create(new errorBase_1.ErrorBase("Error to disconnect", 500));
        }
        return either_1.Right.create(undefined);
    }
    async receive({ receveFunc }) {
        const connection = await RabbitMqConnection_1.RabbitMQConnector.connect();
        const channel = await connection.createChannel();
        const exchangeOrError = await this.createExchange(channel);
        if (exchangeOrError.left) {
            await channel.close();
            await connection.close();
            return either_1.Left.create(exchangeOrError.left);
        }
        const queueOrError = await this.createQueue(channel);
        if (queueOrError.left) {
            await channel.close();
            await connection.close();
            return either_1.Left.create(queueOrError.left);
        }
        await channel.bindQueue(queueOrError.right, config_1.RABBITMQ_EXCHANGE_CHATAPP_NAME || "", "");
        channel.consume(queueOrError.right, message => {
            if (message) {
                const content = JSON.parse(message.content.toString());
                receveFunc(content).then(value => {
                    if (value.left) {
                        channel.nack(message, false, true);
                    }
                    else {
                        channel.ack(message);
                    }
                });
            }
        }, { noAck: false });
        return either_1.Right.create(undefined);
    }
}
exports.PublishSubscribeMessage = PublishSubscribeMessage;
//# sourceMappingURL=publishSubscribe.js.map