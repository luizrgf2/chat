"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserWithGoogleExpressController = void 0;
const loginUserWithGoogle_1 = require("../../presentation/factory/loginUserWithGoogle");
class LoginUserWithGoogleExpressController {
    static async exec(req, res) {
        const factory = loginUserWithGoogle_1.LoginUserWithGoogleFactory.handle();
        const useCase = await factory.exec({
            body: req.body
        });
        if (useCase.error) {
            return res.status(useCase.status).json({ error: useCase.error });
        }
        return res.status(useCase.status).send(useCase.body);
    }
}
exports.LoginUserWithGoogleExpressController = LoginUserWithGoogleExpressController;
//# sourceMappingURL=loginUserWithGoogle.js.map