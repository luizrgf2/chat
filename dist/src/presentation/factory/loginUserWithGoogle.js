"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserWithGoogleFactory = void 0;
const loginUserWIthGoogle_1 = require("../../app/useCases/loginUserWIthGoogle");
const googleOauth_1 = require("../../infra/googleOauth");
const prismaUser_1 = require("../../infra/repository/prismaUser");
const JWT_1 = require("../../infra/services/JWT");
const axiosHttpService_1 = require("../../infra/utils/axiosHttpService");
const loginUserWithGoogle_1 = require("../controllers/loginUserWithGoogle");
class LoginUserWithGoogleFactory {
    static handle() {
        const repo = new prismaUser_1.PrismaUserRepository();
        const service = new axiosHttpService_1.AxiosHttpService();
        const service2 = new googleOauth_1.GoogleOauth2(service);
        const service3 = new JWT_1.JWT();
        const userCase = new loginUserWIthGoogle_1.LoginUserWithGoogleUseCase(repo, service2, service3);
        const controller = new loginUserWithGoogle_1.LoginUserWithGoogleController(userCase);
        return controller;
    }
}
exports.LoginUserWithGoogleFactory = LoginUserWithGoogleFactory;
//# sourceMappingURL=loginUserWithGoogle.js.map