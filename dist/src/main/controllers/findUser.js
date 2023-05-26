"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserExpressController = void 0;
const findUser_1 = require("../../presentation/factory/findUser");
class FindUserExpressController {
    static async exec(req, res) {
        const idUser = req.headers.authorization;
        const factory = findUser_1.FindUserFactory.handle();
        const useCase = await factory.exec({
            body: {
                idUser: idUser || ""
            }
        });
        if (useCase.error) {
            return res.status(useCase.status).json({ error: useCase.error });
        }
        return res.status(useCase.status).send(useCase.body);
    }
}
exports.FindUserExpressController = FindUserExpressController;
//# sourceMappingURL=findUser.js.map