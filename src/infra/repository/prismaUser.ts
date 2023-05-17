import { PrismaClient, User } from "@prisma/client";
import { UserRepositoryInterface } from "../../app/interfaces/repository/user";
import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { UserInterface } from "../../domain/entities/user";
import { UserNotExistsError } from "../../domain/errors/user/userNotExists";
import { ServerError } from "../../app/errors/server";


const prisma = new PrismaClient();



export class PrismaUserRepository implements UserRepositoryInterface {

  private adaptUserPrismaToUserInterface(user: User): UserInterface {
      const { id, createdAt, updatedAt, name, email, pictureUrl } = user;
    
      return {
        id,
        createdAt,
        updatedAt,
        name,
        email,
        pictureUrl:pictureUrl === null ? undefined : pictureUrl,
      };
  }

  async findUserById(id: string): Promise<Either<ErrorBase, UserInterface>> {
      try {
          const user = await prisma.user.findUnique({
              where: { id },
          });

          if(!user) return Left.create(new UserNotExistsError())

          const userAdpterd = this.adaptUserPrismaToUserInterface(user)

          return Promise.resolve(Right.create(userAdpterd));
      } catch (error) {
          return Promise.resolve(Left.create(new ServerError("Erro para encontrar o usuário") ));
      }
  }

  async findUserByEmail(email: string): Promise<Either<ErrorBase, UserInterface>> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if(!user) return Left.create(new UserNotExistsError())

        const userAdpterd = this.adaptUserPrismaToUserInterface(user)

        return Promise.resolve(Right.create(userAdpterd));
    } catch (error) {
        return Promise.resolve(Left.create(new ServerError("Erro para encontrar o usuário") ));
    }
  }

  async createUser(user: Omit<UserInterface, 'createdAt' | 'updatedAt' | 'id'>): Promise<Either<ErrorBase, UserInterface>> {
      try {
        const newUser = await prisma.user.create({
            data: {

              ...user,
            },
        });

        const userAdpterd = this.adaptUserPrismaToUserInterface(newUser)

        return Promise.resolve(Right.create(userAdpterd));
      } catch (error) {
          return Promise.resolve(Left.create(new ServerError("Erro para criar o usuário!")));
      }
  }

  async updateUser(updatedUser: Partial<Omit<User, 'createdAt' | 'updatedAt' | 'id'>>, id: string): Promise<Either<ErrorBase, UserInterface>> {
    try {
      const updatedUserData = await prisma.user.update({
        where: { id },
        data: {
          ...updatedUser,
        },
      });

      const userAdpterd = this.adaptUserPrismaToUserInterface(updatedUserData)


      return Promise.resolve(Right.create(userAdpterd));
    } catch (error) {
        return Promise.resolve(Left.create(new ServerError("Erro para atualizar o usuário!")));
    }
  }

  async deleteUser(id: string): Promise<Either<ErrorBase, void>> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    
      return Promise.resolve(Right.create(undefined));
    
    } catch (error) {
        return Promise.resolve(Left.create(new ServerError("Erro para deletar o usuário!")));
    }
  }
}
