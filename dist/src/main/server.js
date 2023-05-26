"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const express_1 = require("./http/express");
if (!config_1.SERVER_PORT)
    throw new Error("HTTP port is not empty!");
const port = +config_1.SERVER_PORT;
const express = express_1.App;
express.start(port);
//# sourceMappingURL=server.js.map