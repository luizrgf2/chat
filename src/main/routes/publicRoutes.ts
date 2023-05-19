import {Router} from "express"
import { CreateUserWithGoogleExpressController } from "../controllers/createUserWithGoogle"
import { LoginUserWithGoogleExpressController } from "../controllers/loginUserWithGoogle"
import { GetAccesTokenFromGoogleExpressController } from "../controllers/getAccessTokenFromGoogle"

export const publicRoutes = Router()

publicRoutes.get("/user/google/:code",GetAccesTokenFromGoogleExpressController.exec)
publicRoutes.post("/user/register",CreateUserWithGoogleExpressController.exec)
publicRoutes.post("/user/login", LoginUserWithGoogleExpressController.exec)