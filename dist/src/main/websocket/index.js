"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const websocketsConnection_1 = require("../../infra/utils/websocketsConnection");
const processingMessageMessageBrocker_1 = require("../../presentation/factory/processingMessageMessageBrocker");
websocketsConnection_1.io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    const processingMessage = processingMessageMessageBrocker_1.ProcessingMessageMessageBrockerFactory.handle();
    processingMessage.exec({
        idClientSocket: socket.id
    });
    socket.on("mensagem", (msg) => {
        console.log(msg);
    });
    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
        processingMessage.closeConsummer().then(value => {
            if (value.left) {
                console.log("Falha para fecha a conexão!");
            }
        });
    });
});
//# sourceMappingURL=index.js.map