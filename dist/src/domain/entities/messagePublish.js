"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePublishEntity = void 0;
const either_1 = require("../errors/either");
const idInvalid_1 = require("../errors/messagePublish/idInvalid");
const messageInvalid_1 = require("../errors/messagePublish/messageInvalid");
const nameInvalid_1 = require("../errors/user/nameInvalid");
class MessagePublishEntity {
    constructor(message) {
        this.message = message;
    }
    isValidName() {
        if (!this.message.userName)
            return false;
        return this.message.userName.length >= 4 && this.message.userName.length <= 60;
    }
    isValidUUID() {
        if (!this.message.idUser)
            return false;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(this.message.idUser);
    }
    isValidMessage() {
        if (!this.message.message)
            return false;
        return this.message.message.length > 0 || this.message.message.length < 200;
    }
    static create(message) {
        const messageData = new MessagePublishEntity(message);
        const isValidUUID = messageData.isValidUUID();
        const isValidName = messageData.isValidName();
        const isValidMessage = messageData.isValidMessage();
        if (!isValidUUID)
            return either_1.Left.create(new idInvalid_1.IdInvalidError());
        if (!isValidName)
            return either_1.Left.create(new nameInvalid_1.NameInvalidError());
        if (!isValidMessage)
            return either_1.Left.create(new messageInvalid_1.MessageInvalidError());
        return either_1.Right.create(messageData);
    }
    static createWithoutValidations(message) {
        const messageData = new MessagePublishEntity(message);
        return messageData;
    }
}
exports.MessagePublishEntity = MessagePublishEntity;
//# sourceMappingURL=messagePublish.js.map