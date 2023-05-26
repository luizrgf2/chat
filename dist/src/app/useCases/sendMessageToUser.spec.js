"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messagePublish_1 = require("../../../test/mocks/messagePublish/messagePublish");
const user_1 = require("../../../test/mocks/user/user");
const publisherMessage_1 = require("../../../test/repositories/publisherMessage");
const user_2 = require("../../../test/repositories/user");
const idInvalid_1 = require("../../domain/errors/messagePublish/idInvalid");
const messageInvalid_1 = require("../../domain/errors/messagePublish/messageInvalid");
const nameInvalid_1 = require("../../domain/errors/user/nameInvalid");
const sendMessageToUser_1 = require("./sendMessageToUser");
describe("SendMessageToUserUseCase tests", function () {
    const pubMessage = new publisherMessage_1.InMemoryPublishMessage();
    const userRepo = new user_2.InMemoryUserRepository();
    it("shold be able send valid message", async function () {
        var _a;
        userRepo.users.push({
            createdAt: new Date(),
            updatedAt: new Date(),
            email: user_1.UserValid.email,
            id: user_1.UserValid.id,
            name: user_1.UserValid.name,
            pictureUrl: user_1.UserValid.pictureUrl
        });
        const sut = new sendMessageToUser_1.SendMessageToUserUseCase(pubMessage, userRepo);
        const res = await sut.exec({
            idUser: user_1.UserValid.id,
            message: messagePublish_1.ValidMessagePublish.message
        });
        expect(res.right).toHaveProperty("message");
        expect((_a = res.right) === null || _a === void 0 ? void 0 : _a.message).toEqual(messagePublish_1.ValidMessagePublish.message);
    });
    it("shold be able return idInvalid if try send message with invalid id", async function () {
        userRepo.users = [];
        userRepo.users.push({
            createdAt: new Date(),
            updatedAt: new Date(),
            email: user_1.UserValid.email,
            id: "1",
            name: user_1.UserValid.name,
            pictureUrl: user_1.UserValid.pictureUrl
        });
        const sut = new sendMessageToUser_1.SendMessageToUserUseCase(pubMessage, userRepo);
        const res = await sut.exec({
            idUser: "1",
            message: messagePublish_1.ValidMessagePublish.message
        });
        expect(res.left).toBeInstanceOf(idInvalid_1.IdInvalidError);
    });
    it("shold be able return nameInvalid if try send message with invalid userName", async function () {
        userRepo.users = [];
        userRepo.users.push({
            createdAt: new Date(),
            updatedAt: new Date(),
            email: user_1.UserWithInvalidName.email,
            id: user_1.UserWithInvalidName.id,
            name: user_1.UserWithInvalidName.name,
            pictureUrl: user_1.UserWithInvalidName.pictureUrl
        });
        const sut = new sendMessageToUser_1.SendMessageToUserUseCase(pubMessage, userRepo);
        const res = await sut.exec({
            idUser: user_1.UserWithInvalidName.id,
            message: messagePublish_1.ValidMessagePublish.message
        });
        expect(res.left).toBeInstanceOf(nameInvalid_1.NameInvalidError);
    });
    it("shold be able return messageInvalid if try send message with invalid Message", async function () {
        userRepo.users = [];
        userRepo.users.push({
            createdAt: new Date(),
            updatedAt: new Date(),
            email: user_1.UserValid.email,
            id: user_1.UserValid.id,
            name: user_1.UserValid.name,
            pictureUrl: user_1.UserValid.pictureUrl
        });
        const sut = new sendMessageToUser_1.SendMessageToUserUseCase(pubMessage, userRepo);
        const res = await sut.exec({
            idUser: user_1.UserValid.id,
            message: messagePublish_1.MessagePublishWithInvalidMessage.message
        });
        expect(res.left).toBeInstanceOf(messageInvalid_1.MessageInvalidError);
    });
});
//# sourceMappingURL=sendMessageToUser.spec.js.map