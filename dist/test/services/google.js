"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryGoogleOauth2 = void 0;
const tokenExpired_1 = require("../../src/app/errors/auth/tokenExpired");
const either_1 = require("../../src/domain/errors/either");
const errorBase_1 = require("../../src/domain/errors/errorBase");
class InMemoryGoogleOauth2 {
    constructor() {
        this.tokens = {};
        this.userInfos = {};
    }
    createAuthURL() {
        // Implementação fictícia para retornar uma URL de autenticação
        return "https://example.com/auth";
    }
    async getTokens(code) {
        const token = {
            access_token: "ACCESS_TOKEN",
            expires_in: 3600,
            id_token: "ID_TOKEN",
            scope: "profile email",
            token_type: "Bearer",
        };
        if (code === "valid_code")
            return either_1.Right.create(token);
        return either_1.Left.create(new errorBase_1.ErrorBase("Erro nos token", 401));
    }
    async getUserInfos(idToken) {
        if (idToken === "invalid_token")
            return either_1.Left.create(new tokenExpired_1.TokenExpiredError());
        const anotherUserInfo = {
            sub: "123456789",
            name: "John Doe",
            given_name: "John",
            family_name: "Doe",
            email: "another@example.com",
            picture: "https://example.com/profile.jpg",
            locale: "en-US",
            hd: "example.com",
        };
        const userInfo = {
            sub: "123456789",
            name: "John Doe",
            given_name: "John",
            family_name: "Doe",
            email: "john.doe@example.com",
            picture: "https://example.com/profile.jpg",
            locale: "en-US",
            hd: "example.com",
        };
        if (idToken === "another_token")
            return either_1.Right.create(anotherUserInfo);
        this.userInfos[userInfo.sub] = userInfo;
        return Promise.resolve(either_1.Right.create(userInfo));
    }
}
exports.InMemoryGoogleOauth2 = InMemoryGoogleOauth2;
//# sourceMappingURL=google.js.map