"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToUserFactory = void 0;
const sendMessageToUser_1 = require("../../app/useCases/sendMessageToUser");
const prismaUser_1 = require("../../infra/repository/prismaUser");
const publishSubscribe_1 = require("../../infra/services/publishSubscribe");
const sendMessageToUser_2 = require("../controllers/sendMessageToUser");
class SendMessageToUserFactory {
    static handle() {
        const service = new publishSubscribe_1.PublishSubscribeMessage();
        const repo = new prismaUser_1.PrismaUserRepository();
        const userCase = new sendMessageToUser_1.SendMessageToUserUseCase(service, repo);
        const controller = new sendMessageToUser_2.SendMessageToUserController(userCase);
        return controller;
    }
    static handleOnlyUseCase() {
        const service = new publishSubscribe_1.PublishSubscribeMessage();
        const repo = new prismaUser_1.PrismaUserRepository();
        const userCase = new sendMessageToUser_1.SendMessageToUserUseCase(service, repo);
        return userCase;
    }
}
exports.SendMessageToUserFactory = SendMessageToUserFactory;
//# sourceMappingURL=sendMessageToUser.js.map