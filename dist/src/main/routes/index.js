"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const publicRoutes_1 = require("./publicRoutes");
const privateRoutes_1 = require("./privateRoutes");
exports.routes = (0, express_1.Router)();
exports.routes.use(publicRoutes_1.publicRoutes);
exports.routes.use(privateRoutes_1.privateRoutes);
//# sourceMappingURL=index.js.map