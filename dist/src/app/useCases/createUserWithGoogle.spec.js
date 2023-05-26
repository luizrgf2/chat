"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../test/repositories/user");
const google_1 = require("../../../test/services/google");
const emailAlreayExists_1 = require("../../domain/errors/user/emailAlreayExists");
const tokenExpired_1 = require("../errors/auth/tokenExpired");
const createUserWithGoogle_1 = require("./createUserWithGoogle");
describe("createUserWithGoogleUseCase tests", function () {
    const repo = new user_1.InMemoryUserRepository();
    const google = new google_1.InMemoryGoogleOauth2();
    it("should be create valid user with valid access_token", async function () {
        var _a, _b, _c;
        const sut = new createUserWithGoogle_1.CreateUserWithGoogleUseCase(repo, google);
        const res = await sut.exec({
            accessToken: "valid_token"
        });
        expect(res.right).not.toBeUndefined();
        expect(res.right).toHaveProperty("user");
        expect((_a = res.right) === null || _a === void 0 ? void 0 : _a.user).toHaveProperty("id");
        expect((_b = res.right) === null || _b === void 0 ? void 0 : _b.user).toHaveProperty("name");
        expect((_c = res.right) === null || _c === void 0 ? void 0 : _c.user).toHaveProperty("email");
    });
    it("should be able return error create user with invalid access_token", async function () {
        const sut = new createUserWithGoogle_1.CreateUserWithGoogleUseCase(repo, google);
        const res = await sut.exec({
            accessToken: "invalid_token"
        });
        expect(res.left).not.toBeUndefined();
        expect(res.left).toBeInstanceOf(tokenExpired_1.TokenExpiredError);
    });
    it("should be able return error create user already exists", async function () {
        const sut = new createUserWithGoogle_1.CreateUserWithGoogleUseCase(repo, google);
        const res = await sut.exec({
            accessToken: "valid_token"
        });
        expect(res.left).not.toBeUndefined();
        expect(res.left).toBeInstanceOf(emailAlreayExists_1.EmailAlreadyExistsError);
    });
});
//# sourceMappingURL=createUserWithGoogle.spec.js.map