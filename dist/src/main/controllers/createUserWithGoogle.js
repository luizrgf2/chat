"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserWithGoogleExpressController = void 0;
const createUserWithGoogle_1 = require("../../presentation/factory/createUserWithGoogle");
class CreateUserWithGoogleExpressController {
    static async exec(req, res) {
        const factory = createUserWithGoogle_1.CreateUserWithGoogleFactory.handle();
        const useCase = await factory.exec({
            body: req.body
        });
        if (useCase.error) {
            return res.status(useCase.status).json({ error: useCase.error });
        }
        return res.status(useCase.status).send(useCase.body);
    }
}
exports.CreateUserWithGoogleExpressController = CreateUserWithGoogleExpressController;
//# sourceMappingURL=createUserWithGoogle.js.map