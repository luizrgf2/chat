import { LoginUserWithGoogleUseCase } from "../../app/useCases/loginUserWIthGoogle";
import { GoogleOauth2 } from "../../infra/googleOauth";
import { PrismaUserRepository } from "../../infra/repository/prismaUser";
import { AxiosHttpService } from "../../infra/utils/axiosHttpService";
import { LoginUserWithGoogleController } from "../controllers/loginUserWithGoogle";

export class LoginUserWithGoogleFactory{

    static handle(){
        const repo = new PrismaUserRepository()
        const service = new AxiosHttpService()
        const service2 = new GoogleOauth2(service)
        const userCase = new LoginUserWithGoogleUseCase(repo,service2)
        const controller = new LoginUserWithGoogleController(userCase)
        return controller
    }
}