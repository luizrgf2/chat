"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToUserExpressController = void 0;
const sendMessageToUser_1 = require("../../presentation/factory/sendMessageToUser");
class SendMessageToUserExpressController {
    static async exec(req, res) {
        const id = req.headers.authorization || "";
        const factory = sendMessageToUser_1.SendMessageToUserFactory.handle();
        const useCase = await factory.exec({
            body: {
                idUser: id,
                message: req.body.message
            }
        });
        if (useCase.error) {
            return res.status(useCase.status).json({ error: useCase.error });
        }
        return res.status(useCase.status).send(useCase.body);
    }
}
exports.SendMessageToUserExpressController = SendMessageToUserExpressController;
//# sourceMappingURL=sendMessageToUser.js.map