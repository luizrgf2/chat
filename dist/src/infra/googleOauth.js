"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauth2 = void 0;
const tokenExpired_1 = require("../app/errors/auth/tokenExpired");
const config_1 = require("../config");
const either_1 = require("../domain/errors/either");
const errorBase_1 = require("../domain/errors/errorBase");
const axiosHttpService_1 = require("./utils/axiosHttpService");
if (!config_1.GOOGLE_CLIENT_ID || !config_1.GOOGLE_SCOPES || !config_1.GOOGLE_REDIRECT_URI || !config_1.GOOGLE_AUTH_URI || !config_1.GOOGLE_CLIENT_SECRET)
    throw new Error("GOOGLE config not be is empty!");
class GoogleOauth2 {
    constructor(request) {
        this.request = request;
        this.clientId = config_1.GOOGLE_CLIENT_ID || "";
        this.scopes = JSON.parse(config_1.GOOGLE_SCOPES || "");
        this.redirectUri = config_1.GOOGLE_REDIRECT_URI || "";
        this.authUri = config_1.GOOGLE_AUTH_URI || "";
        this.clientSecret = config_1.GOOGLE_CLIENT_SECRET || "";
    }
    createAuthURL() {
        const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${this.scopes.join(" ")}`;
        return authorizationUrl;
    }
    async getTokens(code) {
        const url = "https://accounts.google.com/o/oauth2/token";
        const data = {
            code: decodeURIComponent(code),
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: 'authorization_code'
        };
        const req = await this.request.post(url, data);
        if (req.status !== 200)
            return either_1.Left.create(new errorBase_1.ErrorBase(String(req.data.error), req.status));
        const dataGoogle = req.data;
        return either_1.Right.create(dataGoogle);
    }
    async getUserInfos(idToken) {
        const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
        const req = await this.request.get(url, { Authorization: `Bearer ${idToken}` });
        if (req.status === 401)
            return either_1.Left.create(new tokenExpired_1.TokenExpiredError());
        if (req.status !== 200)
            return either_1.Left.create(new errorBase_1.ErrorBase(req.data.error, req.status));
        return either_1.Right.create(req.data);
    }
}
exports.GoogleOauth2 = GoogleOauth2;
const req = new axiosHttpService_1.AxiosHttpService();
const google = new GoogleOauth2(req);
console.log(google.createAuthURL());
//# sourceMappingURL=googleOauth.js.map