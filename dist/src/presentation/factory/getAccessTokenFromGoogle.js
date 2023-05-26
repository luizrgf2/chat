"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccessTokenFromGoogleFactory = void 0;
const getAccessTokenFromGoogle_1 = require("../../app/useCases/getAccessTokenFromGoogle");
const googleOauth_1 = require("../../infra/googleOauth");
const axiosHttpService_1 = require("../../infra/utils/axiosHttpService");
const getAccessTokenFromGoogle_2 = require("../controllers/getAccessTokenFromGoogle");
class GetAccessTokenFromGoogleFactory {
    static handle() {
        const service = new axiosHttpService_1.AxiosHttpService();
        const service2 = new googleOauth_1.GoogleOauth2(service);
        const userCase = new getAccessTokenFromGoogle_1.GetAccessTokenFromGoogleUseCase(service2);
        const controller = new getAccessTokenFromGoogle_2.GetAccessTokenFromGoogleController(userCase);
        return controller;
    }
}
exports.GetAccessTokenFromGoogleFactory = GetAccessTokenFromGoogleFactory;
//# sourceMappingURL=getAccessTokenFromGoogle.js.map