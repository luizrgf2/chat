import { Router } from "express";
import { SendMessageToUserExpressController } from "../controllers/sendMessageToUser";
import { PrivateRouteMiddleware } from "../http/expressMiddlewares/privateRoute";
import { FindUserExpressController } from "../controllers/findUser";

export const privateRoutes = Router()
privateRoutes.use(PrivateRouteMiddleware)

privateRoutes.post("/user/message/send",SendMessageToUserExpressController.exec)
privateRoutes.post("/user/find",FindUserExpressController.exec)
