import { GetAccessTokenFromGoogleUseCase } from "../../app/useCases/getAccessTokenFromGoogle";
import { GoogleOauth2 } from "../../infra/googleOauth";
import { AxiosHttpService } from "../../infra/utils/axiosHttpService";
import { GetAccessTokenFromGoogleController } from "../controllers/getAccessTokenFromGoogle";

export class GetAccessTokenFromGoogleFactory{

    static handle(){
        const service = new AxiosHttpService()
        const service2 = new GoogleOauth2(service)
        const userCase = new GetAccessTokenFromGoogleUseCase(service2  )
        const controller = new GetAccessTokenFromGoogleController(userCase)
        return controller
    }
}