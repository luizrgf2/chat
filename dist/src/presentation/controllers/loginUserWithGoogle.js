"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserWithGoogleController = void 0;
class LoginUserWithGoogleController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async exec(input) {
        const { body } = input;
        if (!body)
            return { status: 400, error: "Compo da requisição inválido!" };
        const response = await this.useCase.exec({
            ...body
        });
        if (response.left)
            return { status: response.left.code, error: response.left.message };
        return {
            status: 200,
            body: response.right
        };
    }
}
exports.LoginUserWithGoogleController = LoginUserWithGoogleController;
//# sourceMappingURL=loginUserWithGoogle.js.map