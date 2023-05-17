import { UserInterface } from "../../../domain/entities/user";
import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";

export interface UserRepositoryInterface {
    findUserById(id: string): Promise<Either<ErrorBase,UserInterface>>;
    findUserByEmail(email: string): Promise<Either<ErrorBase,UserInterface>>;
    createUser(user: Omit<UserInterface,"createdAt"|"updatedAt"|"id">): Promise<Either<ErrorBase,UserInterface>>;
    updateUser(user: Partial<Omit<UserInterface,"createdAt"|"updatedAt"|"id">>,id:string): Promise<Either<ErrorBase,UserInterface>>;
    deleteUser(id: string): Promise<Either<ErrorBase,void>>;
  }
  