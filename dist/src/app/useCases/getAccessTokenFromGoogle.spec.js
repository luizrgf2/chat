"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = require("../../../test/services/google");
const getAccessTokenFromGoogle_1 = require("./getAccessTokenFromGoogle");
describe("GetAccessTokenFromGoogleUseCase tests", function () {
    const google = new google_1.InMemoryGoogleOauth2();
    it("should be able return access token with valid code", async function () {
        const sut = new getAccessTokenFromGoogle_1.GetAccessTokenFromGoogleUseCase(google);
        const res = await sut.exec({
            code: "valid_code"
        });
        expect(res.right).not.toBeUndefined();
        expect(res.right).toHaveProperty("accessToken");
    });
    it("should be able return error if try with invalid code", async function () {
        const sut = new getAccessTokenFromGoogle_1.GetAccessTokenFromGoogleUseCase(google);
        const res = await sut.exec({
            code: "invalid_code"
        });
        expect(res.left).not.toBeUndefined();
    });
});
//# sourceMappingURL=getAccessTokenFromGoogle.spec.js.map