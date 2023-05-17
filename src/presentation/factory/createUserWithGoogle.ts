import { CreateUserWithGoogleUseCase } from "../../app/useCases/createUserWithGoogle";
import { GoogleOauth2 } from "../../infra/googleOauth";
import { PrismaUserRepository } from "../../infra/repository/prismaUser";
import { AxiosHttpService } from "../../infra/utils/axiosHttpService";
import { CreateUserWithGoogleController } from "../controllers/createUserWithGoogle";

export class CreateUserWithGoogleFactory{

    static handle(){
        const repo = new PrismaUserRepository()
        const service = new AxiosHttpService()
        const service2 = new GoogleOauth2(service)
        const userCase = new CreateUserWithGoogleUseCase(repo,service2)
        const controller = new CreateUserWithGoogleController(userCase)
        return controller
    }
}