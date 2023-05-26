"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = void 0;
const express_1 = require("express");
const createUserWithGoogle_1 = require("../controllers/createUserWithGoogle");
const loginUserWithGoogle_1 = require("../controllers/loginUserWithGoogle");
const getAccessTokenFromGoogle_1 = require("../controllers/getAccessTokenFromGoogle");
exports.publicRoutes = (0, express_1.Router)();
exports.publicRoutes.get("/user/google/:code", getAccessTokenFromGoogle_1.GetAccesTokenFromGoogleExpressController.exec);
exports.publicRoutes.post("/user/register", createUserWithGoogle_1.CreateUserWithGoogleExpressController.exec);
exports.publicRoutes.post("/user/login", loginUserWithGoogle_1.LoginUserWithGoogleExpressController.exec);
//# sourceMappingURL=publicRoutes.js.map