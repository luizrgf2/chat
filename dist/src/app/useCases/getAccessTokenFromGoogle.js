"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccessTokenFromGoogleUseCase = void 0;
const either_1 = require("../../domain/errors/either");
class GetAccessTokenFromGoogleUseCase {
    constructor(google) {
        this.google = google;
    }
    async exec(input) {
        const { code } = input;
        const getTokens = await this.google.getTokens(code);
        if (getTokens.left)
            return either_1.Left.create(getTokens.left);
        const accessToken = getTokens.right.access_token;
        return either_1.Right.create({
            accessToken: accessToken
        });
    }
}
exports.GetAccessTokenFromGoogleUseCase = GetAccessTokenFromGoogleUseCase;
//# sourceMappingURL=getAccessTokenFromGoogle.js.map