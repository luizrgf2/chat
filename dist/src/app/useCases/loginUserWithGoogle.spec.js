"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../test/repositories/user");
const google_1 = require("../../../test/services/google");
const jwt_1 = require("../../../test/services/jwt");
const userNotExists_1 = require("../../domain/errors/user/userNotExists");
const tokenExpired_1 = require("../errors/auth/tokenExpired");
const createUserWithGoogle_1 = require("./createUserWithGoogle");
const loginUserWIthGoogle_1 = require("./loginUserWIthGoogle");
describe("createUserWithGoogleUseCase tests", function () {
    const repo = new user_1.InMemoryUserRepository();
    const google = new google_1.InMemoryGoogleOauth2();
    const jwt = new jwt_1.InMemoryJWT();
    const createUser = new createUserWithGoogle_1.CreateUserWithGoogleUseCase(repo, google);
    it("should be login with user already exists", async function () {
        var _a, _b, _c;
        await createUser.exec({
            accessToken: "valid_token"
        });
        const sut = new loginUserWIthGoogle_1.LoginUserWithGoogleUseCase(repo, google, jwt);
        const res = await sut.exec({
            accessToken: "valid_token"
        });
        expect(res.right).not.toBeUndefined();
        expect(res.right).toHaveProperty("user");
        expect(res.right).toHaveProperty("token");
        expect((_a = res.right) === null || _a === void 0 ? void 0 : _a.user).toHaveProperty("id");
        expect((_b = res.right) === null || _b === void 0 ? void 0 : _b.user).toHaveProperty("name");
        expect((_c = res.right) === null || _c === void 0 ? void 0 : _c.user).toHaveProperty("email");
    });
    it("should be able return error if try login with user not exists", async function () {
        const sut = new loginUserWIthGoogle_1.LoginUserWithGoogleUseCase(repo, google, jwt);
        const res = await sut.exec({
            accessToken: "another_token"
        });
        expect(res.left).not.toBeUndefined();
        expect(res.left).toBeInstanceOf(userNotExists_1.UserNotExistsError);
    });
    it("should be able return error with invalid_token", async function () {
        const sut = new loginUserWIthGoogle_1.LoginUserWithGoogleUseCase(repo, google, jwt);
        const res = await sut.exec({
            accessToken: "invalid_token"
        });
        expect(res.left).not.toBeUndefined();
        expect(res.left).toBeInstanceOf(tokenExpired_1.TokenExpiredError);
    });
});
//# sourceMappingURL=loginUserWithGoogle.spec.js.map