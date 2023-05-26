"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosHttpService = void 0;
const axios_1 = __importDefault(require("axios"));
class AxiosHttpService {
    async get(url, headers) {
        try {
            const response = await axios_1.default.get(url, { headers });
            return {
                data: response.data,
                status: response.status,
            };
        }
        catch (error) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        }
    }
    async post(url, data, headers) {
        try {
            const response = await axios_1.default.post(url, data, { headers });
            return {
                data: response.data,
                status: response.status,
            };
        }
        catch (error) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        }
    }
    async put(url, data, headers) {
        try {
            const response = await axios_1.default.put(url, data, { headers });
            return {
                data: response.data,
                status: response.status,
            };
        }
        catch (error) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        }
    }
    async delete(url, headers) {
        try {
            const response = await axios_1.default.delete(url, { headers });
            return {
                data: response.data,
                status: response.status,
            };
        }
        catch (error) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        }
    }
}
exports.AxiosHttpService = AxiosHttpService;
//# sourceMappingURL=axiosHttpService.js.map