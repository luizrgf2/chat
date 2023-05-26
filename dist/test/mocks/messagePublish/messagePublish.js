"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePublishWithInvalidUserName = exports.MessagePublishWithInvalidMessage = exports.MessagePublishWithInvalidId = exports.ValidMessagePublish = void 0;
exports.ValidMessagePublish = {
    idUser: "c804305a-f6ae-11ed-b67e-0242ac120002",
    message: "Olá mensagem válida!",
    userName: "Felipe Gomes"
};
exports.MessagePublishWithInvalidId = {
    idUser: "invalidId",
    message: "Olá mensagem válida!",
    userName: "Felipe Gomes"
};
exports.MessagePublishWithInvalidMessage = {
    idUser: "c804305a-f6ae-11ed-b67e-0242ac120002",
    message: "",
    userName: "Felipe Gomes"
};
exports.MessagePublishWithInvalidUserName = {
    idUser: "c804305a-f6ae-11ed-b67e-0242ac120002",
    message: "Olá nova mensagem",
    userName: ""
};
//# sourceMappingURL=messagePublish.js.map