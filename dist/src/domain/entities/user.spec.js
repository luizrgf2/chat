"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../test/mocks/user/user");
const emailInvalid_1 = require("../errors/user/emailInvalid");
const nameInvalid_1 = require("../errors/user/nameInvalid");
const user_2 = require("./user");
describe("UserEntity tests", function () {
    it("should be able create user with valid user", function () {
        const sut = user_2.UserEntity.create({ ...user_1.UserValid });
        expect(sut.left).toBeUndefined();
        expect(sut.right).toBeInstanceOf(user_2.UserEntity);
    });
    it("should be able return error to create user with invalid email", function () {
        const sut = user_2.UserEntity.create({ ...user_1.UserWithInvalidEmail });
        expect(sut.left).toBeInstanceOf(emailInvalid_1.EmailInvalidError);
    });
    it("should be able return error to create user with invalid name", function () {
        const sut = user_2.UserEntity.create({ ...user_1.UserWithInvalidName });
        expect(sut.left).toBeInstanceOf(nameInvalid_1.NameInvalidError);
    });
    it("should be able return error to create user without email", function () {
        const sut = user_2.UserEntity.create({ ...user_1.UserWithWithoutEmail });
        expect(sut.left).toBeInstanceOf(emailInvalid_1.EmailInvalidError);
    });
    it("should be able return error to create user without name", function () {
        const sut = user_2.UserEntity.create({ ...user_1.UserWithWithoutName });
        expect(sut.left).toBeInstanceOf(nameInvalid_1.NameInvalidError);
    });
});
//# sourceMappingURL=user.spec.js.map