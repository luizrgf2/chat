"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRoutes = void 0;
const express_1 = require("express");
const sendMessageToUser_1 = require("../controllers/sendMessageToUser");
const privateRoute_1 = require("../http/expressMiddlewares/privateRoute");
const findUser_1 = require("../controllers/findUser");
exports.privateRoutes = (0, express_1.Router)();
exports.privateRoutes.use(privateRoute_1.PrivateRouteMiddleware);
exports.privateRoutes.post("/user/message/send", sendMessageToUser_1.SendMessageToUserExpressController.exec);
exports.privateRoutes.get("/user/find", findUser_1.FindUserExpressController.exec);
//# sourceMappingURL=privateRoutes.js.map