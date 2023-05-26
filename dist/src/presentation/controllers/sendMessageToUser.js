"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToUserController = void 0;
class SendMessageToUserController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async exec(input) {
        const { body } = input;
        if (!body)
            return { status: 400, error: "Compo da requisição inválido!" };
        const res = await this.useCase.exec(body);
        if (res.left)
            return { status: res.left.code, error: res.left.message };
        return { body: { message: body.message }, status: 200 };
    }
}
exports.SendMessageToUserController = SendMessageToUserController;
//# sourceMappingURL=sendMessageToUser.js.map