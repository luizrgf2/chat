import { Router } from "express";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

export const routes = Router()
routes.use(publicRoutes)
routes.use(privateRoutes)