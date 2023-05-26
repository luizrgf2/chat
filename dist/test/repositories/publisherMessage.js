"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPublishMessage = void 0;
const either_1 = require("../../src/domain/errors/either");
class InMemoryPublishMessage {
    constructor() {
        this.messages = [];
    }
    async closeConsummer() {
        return either_1.Right.create(undefined);
    }
    async send({ idUser, message, userName }) {
        return either_1.Right.create(undefined);
    }
    async receive(input) {
        return either_1.Right.create(undefined);
    }
}
exports.InMemoryPublishMessage = InMemoryPublishMessage;
//# sourceMappingURL=publisherMessage.js.map