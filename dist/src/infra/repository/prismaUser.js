"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const either_1 = require("../../domain/errors/either");
const userNotExists_1 = require("../../domain/errors/user/userNotExists");
const server_1 = require("../../app/errors/server");
const prisma = new client_1.PrismaClient();
class PrismaUserRepository {
    adaptUserPrismaToUserInterface(user) {
        const { id, createdAt, updatedAt, name, email, pictureUrl } = user;
        return {
            id,
            createdAt,
            updatedAt,
            name,
            email,
            pictureUrl: pictureUrl === null ? undefined : pictureUrl,
        };
    }
    async findUserById(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user)
                return either_1.Left.create(new userNotExists_1.UserNotExistsError());
            const userAdpterd = this.adaptUserPrismaToUserInterface(user);
            return Promise.resolve(either_1.Right.create(userAdpterd));
        }
        catch (error) {
            return Promise.resolve(either_1.Left.create(new server_1.ServerError("Erro para encontrar o usuário")));
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user)
                return either_1.Left.create(new userNotExists_1.UserNotExistsError());
            const userAdpterd = this.adaptUserPrismaToUserInterface(user);
            return Promise.resolve(either_1.Right.create(userAdpterd));
        }
        catch (error) {
            return Promise.resolve(either_1.Left.create(new server_1.ServerError("Erro para encontrar o usuário")));
        }
    }
    async createUser(user) {
        try {
            const newUser = await prisma.user.create({
                data: {
                    ...user,
                },
            });
            const userAdpterd = this.adaptUserPrismaToUserInterface(newUser);
            return Promise.resolve(either_1.Right.create(userAdpterd));
        }
        catch (error) {
            return Promise.resolve(either_1.Left.create(new server_1.ServerError("Erro para criar o usuário!")));
        }
    }
    async updateUser(updatedUser, id) {
        try {
            const updatedUserData = await prisma.user.update({
                where: { id },
                data: {
                    ...updatedUser,
                },
            });
            const userAdpterd = this.adaptUserPrismaToUserInterface(updatedUserData);
            return Promise.resolve(either_1.Right.create(userAdpterd));
        }
        catch (error) {
            return Promise.resolve(either_1.Left.create(new server_1.ServerError("Erro para atualizar o usuário!")));
        }
    }
    async deleteUser(id) {
        try {
            await prisma.user.delete({
                where: { id },
            });
            return Promise.resolve(either_1.Right.create(undefined));
        }
        catch (error) {
            return Promise.resolve(either_1.Left.create(new server_1.ServerError("Erro para deletar o usuário!")));
        }
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
//# sourceMappingURL=prismaUser.js.map