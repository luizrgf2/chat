"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../test/mocks/user/user");
const userNotExists_1 = require("../../domain/errors/user/userNotExists");
const prismaUser_1 = require("./prismaUser");
describe("tests to PrismaUserRepository", function () {
    const sut = new prismaUser_1.PrismaUserRepository();
    let idToTest = "";
    it("should be able create valid user and return user created", async function () {
        var _a;
        const user = await sut.createUser({
            email: user_1.UserValid.email,
            name: user_1.UserValid.name,
            pictureUrl: user_1.UserValid.pictureUrl
        });
        expect(user.right).not.toBeUndefined();
        expect(user.right).toHaveProperty("id");
        expect(user.right).toHaveProperty("email");
        expect(user.right).toHaveProperty("name");
        idToTest = ((_a = user.right) === null || _a === void 0 ? void 0 : _a.id) || "";
    });
    it("should be able find user with valid id", async function () {
        const user = await sut.findUserById(idToTest);
        expect(user.right).not.toBeUndefined();
        expect(user.right).toHaveProperty("id");
        expect(user.right).toHaveProperty("email");
        expect(user.right).toHaveProperty("name");
    });
    it("should be able find user with valid email", async function () {
        const user = await sut.findUserByEmail(user_1.UserValid.email);
        expect(user.right).not.toBeUndefined();
        expect(user.right).toHaveProperty("id");
        expect(user.right).toHaveProperty("email");
        expect(user.right).toHaveProperty("name");
    });
    it("should be able update user with valid id", async function () {
        var _a, _b;
        const update = {
            email: "teste@gmail.com",
            name: "teste"
        };
        const user = await sut.updateUser({
            ...update
        }, idToTest);
        expect(user.right).not.toBeUndefined();
        expect(user.right).toHaveProperty("id");
        expect(user.right).toHaveProperty("email");
        expect(user.right).toHaveProperty("name");
        expect((_a = user.right) === null || _a === void 0 ? void 0 : _a.email).toEqual(update.email);
        expect((_b = user.right) === null || _b === void 0 ? void 0 : _b.name).toEqual(update.name);
    });
    it("should be able delete user with valid id", async function () {
        const user = await sut.deleteUser(idToTest);
        expect(user.left).toBeUndefined();
        const userFind = await sut.findUserById(idToTest);
        expect(userFind.left).toBeInstanceOf(userNotExists_1.UserNotExistsError);
    });
});
//# sourceMappingURL=prismaUser.spec.js.map