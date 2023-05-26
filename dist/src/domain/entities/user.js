"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const either_1 = require("../errors/either");
const emailInvalid_1 = require("../errors/user/emailInvalid");
const nameInvalid_1 = require("../errors/user/nameInvalid");
class UserEntity {
    constructor(user) {
        this.user = user;
    }
    isValidEmail() {
        if (!this.user.email)
            return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.user.email);
    }
    isValidName() {
        if (!this.user.name)
            return false;
        return this.user.name.length >= 4 && this.user.name.length <= 60;
    }
    static create(userData) {
        const user = new UserEntity({
            ...userData,
            id: "",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        if (!user.isValidEmail())
            return either_1.Left.create(new emailInvalid_1.EmailInvalidError());
        if (!user.isValidName())
            return either_1.Left.create(new nameInvalid_1.NameInvalidError());
        return either_1.Right.create(user);
    }
    static createWithoutValidations(user) {
        return new UserEntity(user);
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.js.map