"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserUseCase = void 0;
const either_1 = require("../../domain/errors/either");
class FindUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async exec(input) {
        const { idUser } = input;
        const user = await this.userRepository.findUserById(idUser);
        if (user.left)
            return either_1.Left.create(user.left);
        return either_1.Right.create({
            user: user.right
        });
    }
}
exports.FindUserUseCase = FindUserUseCase;
//# sourceMappingURL=findUser.js.map