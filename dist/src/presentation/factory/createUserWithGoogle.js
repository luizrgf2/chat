"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserWithGoogleFactory = void 0;
const createUserWithGoogle_1 = require("../../app/useCases/createUserWithGoogle");
const googleOauth_1 = require("../../infra/googleOauth");
const prismaUser_1 = require("../../infra/repository/prismaUser");
const axiosHttpService_1 = require("../../infra/utils/axiosHttpService");
const createUserWithGoogle_2 = require("../controllers/createUserWithGoogle");
class CreateUserWithGoogleFactory {
    static handle() {
        const repo = new prismaUser_1.PrismaUserRepository();
        const service = new axiosHttpService_1.AxiosHttpService();
        const service2 = new googleOauth_1.GoogleOauth2(service);
        const userCase = new createUserWithGoogle_1.CreateUserWithGoogleUseCase(repo, service2);
        const controller = new createUserWithGoogle_2.CreateUserWithGoogleController(userCase);
        return controller;
    }
}
exports.CreateUserWithGoogleFactory = CreateUserWithGoogleFactory;
//# sourceMappingURL=createUserWithGoogle.js.map