"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes");
class ExpressServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(routes_1.routes);
    }
    start(port) {
        const portFinal = port === undefined ? 8080 : port;
        this.app.listen(portFinal, () => {
            console.log(`Server express is started in http://localhost:${portFinal}`);
        });
    }
}
exports.App = new ExpressServer();
//# sourceMappingURL=express.js.map