"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../test/mocks/user/user");
const user_2 = require("../../../test/repositories/user");
const userNotExists_1 = require("../../domain/errors/user/userNotExists");
const findUser_1 = require("./findUser");
describe("FindUserUseCase tests", function () {
    const userRepo = new user_2.InMemoryUserRepository();
    let idTest = "";
    it("should be able find valid user with valid id", async function () {
        var _a, _b, _c;
        await userRepo.createUser({
            email: user_1.UserValid.email,
            name: user_1.UserValid.name,
            pictureUrl: user_1.UserValid.pictureUrl
        });
        idTest = userRepo.users[0].id;
        const sut = new findUser_1.FindUserUseCase(userRepo);
        const res = await sut.exec({
            idUser: idTest
        });
        expect(res.right).toHaveProperty("user");
        expect((_a = res.right) === null || _a === void 0 ? void 0 : _a.user.email).toEqual(user_1.UserValid.email);
        expect((_b = res.right) === null || _b === void 0 ? void 0 : _b.user.name).toEqual(user_1.UserValid.name);
        expect((_c = res.right) === null || _c === void 0 ? void 0 : _c.user.id).toEqual(idTest);
    });
    it("should be able return userNotExistsError if try find user with id invalid or id not exists", async function () {
        userRepo.users = [];
        const sut = new findUser_1.FindUserUseCase(userRepo);
        const res = await sut.exec({
            idUser: "invalid_id"
        });
        expect(res.left).toBeInstanceOf(userNotExists_1.UserNotExistsError);
    });
});
//# sourceMappingURL=findUser.spec.js.map