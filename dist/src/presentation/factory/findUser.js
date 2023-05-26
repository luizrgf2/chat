"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserFactory = void 0;
const findUser_1 = require("../../app/useCases/findUser");
const prismaUser_1 = require("../../infra/repository/prismaUser");
const findUser_2 = require("../controllers/findUser");
class FindUserFactory {
    static handle() {
        const repo = new prismaUser_1.PrismaUserRepository();
        const userCase = new findUser_1.FindUserUseCase(repo);
        const controller = new findUser_2.FindUserController(userCase);
        return controller;
    }
}
exports.FindUserFactory = FindUserFactory;
//# sourceMappingURL=findUser.js.map