import { FindUserUseCase } from "../../app/useCases/findUser";
import { PrismaUserRepository } from "../../infra/repository/prismaUser";
import { FindUserController } from "../controllers/findUser";

export class FindUserFactory{

    static handle(){
        const repo = new PrismaUserRepository()
        const userCase = new FindUserUseCase(repo)
        const controller = new FindUserController(userCase)
        return controller
    }
}