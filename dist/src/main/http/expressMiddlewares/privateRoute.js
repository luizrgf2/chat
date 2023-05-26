"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateRouteMiddleware = void 0;
const JWT_1 = require("../../../infra/services/JWT");
const jsonwebtoken_1 = require("jsonwebtoken");
async function PrivateRouteMiddleware(req, res, next) {
    const headers = req.headers;
    const authorization = headers.authorization;
    if (!authorization)
        return res.status(401).send();
    const jwt = new JWT_1.JWT();
    const decoded = await jwt.decode(authorization);
    if (decoded.left) {
        if (decoded.left instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(401).send({ error: decoded.left.message });
        }
        else {
            return res.status(401);
        }
    }
    const id = decoded.right.id;
    req.headers.authorization = id;
    next();
}
exports.PrivateRouteMiddleware = PrivateRouteMiddleware;
//# sourceMappingURL=privateRoute.js.map