"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserWithGoogleController = void 0;
class CreateUserWithGoogleController {
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
            status: 201,
            body: response.right
        };
    }
}
exports.CreateUserWithGoogleController = CreateUserWithGoogleController;
//# sourceMappingURL=createUserWithGoogle.js.map