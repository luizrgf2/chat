"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToUserUseCase = void 0;
const messagePublish_1 = require("../../domain/entities/messagePublish");
const either_1 = require("../../domain/errors/either");
class SendMessageToUserUseCase {
    constructor(messagePublisher, userRepo) {
        this.messagePublisher = messagePublisher;
        this.userRepo = userRepo;
    }
    async sendMessage(message) {
        const send = await this.messagePublisher.send(message);
        if (send.left)
            return either_1.Left.create(send.left);
        return either_1.Right.create(undefined);
    }
    async exec(input) {
        const { message, idUser } = input;
        const userOrError = await this.userRepo.findUserById(idUser);
        if (userOrError.left)
            return either_1.Left.create(userOrError.left);
        const messageData = messagePublish_1.MessagePublishEntity.create({
            idUser: userOrError.right.id,
            userName: userOrError.right.name,
            message: message
        });
        if (messageData.left)
            return either_1.Left.create(messageData.left);
        const send = await this.sendMessage({
            idUser: userOrError.right.id,
            message: message,
            userName: userOrError.right.name
        });
        if (send.left)
            return either_1.Left.create(send.left);
        return either_1.Right.create({
            message: message
        });
    }
}
exports.SendMessageToUserUseCase = SendMessageToUserUseCase;
//# sourceMappingURL=sendMessageToUser.js.map