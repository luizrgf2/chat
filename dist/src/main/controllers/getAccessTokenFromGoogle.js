"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccesTokenFromGoogleExpressController = void 0;
const getAccessTokenFromGoogle_1 = require("../../presentation/factory/getAccessTokenFromGoogle");
class GetAccesTokenFromGoogleExpressController {
    static async exec(req, res) {
        const code = req.params.code;
        const factory = getAccessTokenFromGoogle_1.GetAccessTokenFromGoogleFactory.handle();
        const useCase = await factory.exec({
            body: { code: code }
        });
        if (useCase.error) {
            return res.status(useCase.status).json({ error: useCase.error });
        }
        return res.status(useCase.status).send(useCase.body);
    }
}
exports.GetAccesTokenFromGoogleExpressController = GetAccesTokenFromGoogleExpressController;
//# sourceMappingURL=getAccessTokenFromGoogle.js.map