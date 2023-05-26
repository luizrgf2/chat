"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const either_1 = require("../../src/domain/errors/either");
const userNotExists_1 = require("../../src/domain/errors/user/userNotExists");
class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }
    async findUserById(id) {
        const user = this.users.find((user) => user.id === id);
        if (user) {
            return Promise.resolve(either_1.Right.create(user));
        }
        else {
            return Promise.resolve(either_1.Left.create(new userNotExists_1.UserNotExistsError()));
        }
    }
    async findUserByEmail(email) {
        const user = this.users.filter(user => user.email === email);
        if (user[0]) {
            return Promise.resolve(either_1.Right.create(user[0]));
        }
        else {
            return Promise.resolve(either_1.Left.create(new userNotExists_1.UserNotExistsError()));
        }
    }
    async createUser(user) {
        const newUser = {
            id: Math.random().toString(36),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...user,
        };
        this.users.push(newUser);
        return Promise.resolve(either_1.Right.create(newUser));
    }
    async updateUser(updatedUser, id) {
        const user = this.users.find((user) => user.id === id);
        if (user) {
            const updatedUserData = {
                ...user,
                ...updatedUser,
                updatedAt: new Date(),
            };
            Object.assign(user, updatedUserData);
            return Promise.resolve(either_1.Right.create(updatedUserData));
        }
        else {
            return Promise.resolve(either_1.Left.create(new userNotExists_1.UserNotExistsError()));
        }
    }
    async deleteUser(id) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return Promise.resolve(either_1.Right.create(undefined));
        }
        else {
            return Promise.resolve(either_1.Left.create(new userNotExists_1.UserNotExistsError()));
        }
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=user.js.map