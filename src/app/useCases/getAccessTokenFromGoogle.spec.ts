import { InMemoryGoogleOauth2 } from "../../../test/services/google"
import { GetAccessTokenFromGoogleUseCase } from "./getAccessTokenFromGoogle"

describe("GetAccessTokenFromGoogleUseCase tests" , function(){


    const google = new InMemoryGoogleOauth2()

    it("should be able return access token with valid code", async function(){
        const sut = new GetAccessTokenFromGoogleUseCase(google)
        
        const res = await sut.exec({
            code:"valid_code"
        })

        expect(res.right).not.toBeUndefined()
        expect(res.right).toHaveProperty("accessToken")
    })

    it("should be able return error if try with invalid code", async function(){
        const sut = new GetAccessTokenFromGoogleUseCase(google)
        
        const res = await sut.exec({
            code:"invalid_code"
        })

        expect(res.left).not.toBeUndefined()
    })

})