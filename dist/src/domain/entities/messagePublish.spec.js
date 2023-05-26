"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messagePublish_1 = require("../../../test/mocks/messagePublish/messagePublish");
const idInvalid_1 = require("../errors/messagePublish/idInvalid");
const messageInvalid_1 = require("../errors/messagePublish/messageInvalid");
const nameInvalid_1 = require("../errors/user/nameInvalid");
const messagePublish_2 = require("./messagePublish");
describe("MessagePusblishEntity tests", function () {
    it("should be able create MessagePublishEntity with valid infos", function () {
        const sut = messagePublish_2.MessagePublishEntity.create({
            ...messagePublish_1.ValidMessagePublish
        });
        expect(sut.right).toBeInstanceOf(messagePublish_2.MessagePublishEntity);
    });
    it("should be able return invaliId error if try create MessagePublishEntity with invalid id", function () {
        const sut = messagePublish_2.MessagePublishEntity.create({
            ...messagePublish_1.MessagePublishWithInvalidId
        });
        expect(sut.left).toBeInstanceOf(idInvalid_1.IdInvalidError);
    });
    it("should be able return invalidName error if try create MessagePublishEntity with invalid userName", function () {
        const sut = messagePublish_2.MessagePublishEntity.create({
            ...messagePublish_1.MessagePublishWithInvalidUserName
        });
        expect(sut.left).toBeInstanceOf(nameInvalid_1.NameInvalidError);
    });
    it("should be able return invalidMessage error if try create MessagePublishEntity with invalid message", function () {
        const sut = messagePublish_2.MessagePublishEntity.create({
            ...messagePublish_1.MessagePublishWithInvalidMessage
        });
        expect(sut.left).toBeInstanceOf(messageInvalid_1.MessageInvalidError);
    });
});
//# sourceMappingURL=messagePublish.spec.js.map