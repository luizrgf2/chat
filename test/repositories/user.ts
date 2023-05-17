import { UserRepositoryInterface } from "../../src/app/interfaces/repository/user";
import { UserInterface } from "../../src/domain/entities/user";
import { Either, Left, Right } from "../../src/domain/errors/either";
import { ErrorBase } from "../../src/domain/errors/errorBase";
import { UserNotExistsError } from "../../src/domain/errors/user/userNotExists";


export class InMemoryUserRepository implements UserRepositoryInterface {
  users: UserInterface[];

  constructor() {
    this.users = [];
  }

  async findUserById(id: string): Promise<Either<ErrorBase, UserInterface>> {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return Promise.resolve(Right.create(user));
    } else {
      return Promise.resolve(Left.create(new UserNotExistsError()));
    }
  }

  async findUserByEmail(email: string): Promise<Either<ErrorBase, UserInterface>> {
    const user = this.users.filter(user=>user.email === email);

    if (user[0]) {
        return Promise.resolve(Right.create(user[0]));
      } else {
        return Promise.resolve(Left.create(new UserNotExistsError()));
      }
  }

  async createUser(
    user: Omit<UserInterface, "createdAt" | "updatedAt" | "id">
  ): Promise<Either<ErrorBase, UserInterface>> {
    const newUser: UserInterface = {
      id: Math.random().toString(36),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...user,
    };

    this.users.push(newUser);

    return Promise.resolve(Right.create(newUser));
  }

  async updateUser(
    updatedUser: Partial<Omit<UserInterface, "createdAt" | "updatedAt" | "id">>,
    id:string
  ): Promise<Either<ErrorBase, UserInterface>> {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      const updatedUserData: UserInterface = {
        ...user,
        ...updatedUser,
        updatedAt: new Date(),
      };

      Object.assign(user, updatedUserData);

      return Promise.resolve(Right.create(updatedUserData));
    } else {
        return Promise.resolve(Left.create(new UserNotExistsError()));
    }
  }

  async deleteUser(id: string): Promise<Either<ErrorBase, void>> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return Promise.resolve(Right.create(undefined));
    } else {
        return Promise.resolve(Left.create(new UserNotExistsError()));
    }
  }
}