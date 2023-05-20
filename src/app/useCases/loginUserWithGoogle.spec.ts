import { InMemoryUserRepository } from "../../../test/repositories/user"
import { InMemoryGoogleOauth2 } from "../../../test/services/google"
import { InMemoryJWT } from "../../../test/services/jwt"
import { UserNotExistsError } from "../../domain/errors/user/userNotExists"
import { TokenExpiredError } from "../errors/auth/tokenExpired"
import { CreateUserWithGoogleUseCase } from "./createUserWithGoogle"
import { LoginUserWithGoogleUseCase } from "./loginUserWIthGoogle"

describe("createUserWithGoogleUseCase tests", function(){

    const repo = new InMemoryUserRepository()
    const google = new InMemoryGoogleOauth2()
    const jwt = new InMemoryJWT()
    
    const createUser = new CreateUserWithGoogleUseCase(repo,google)

    it("should be login with user already exists", async function(){
        await createUser.exec({
            accessToken:"valid_token"
        })

        const sut = new LoginUserWithGoogleUseCase(repo,google,jwt)

        const res = await sut.exec({
            accessToken:"valid_token"
        })

        expect(res.right).not.toBeUndefined()
        expect(res.right).toHaveProperty("user")
        expect(res.right).toHaveProperty("token")
        expect(res.right?.user).toHaveProperty("id")
        expect(res.right?.user).toHaveProperty("name")
        expect(res.right?.user).toHaveProperty("email")
    })

    it("should be able return error if try login with user not exists", async function(){
        const sut = new LoginUserWithGoogleUseCase(repo,google,jwt)

        const res = await sut.exec({
            accessToken:"another_token"
        })

        expect(res.left).not.toBeUndefined()
        expect(res.left).toBeInstanceOf(UserNotExistsError)
    })

    it("should be able return error with invalid_token", async function(){
        const sut = new LoginUserWithGoogleUseCase(repo,google,jwt)

        const res = await sut.exec({
            accessToken:"invalid_token"
        })

        expect(res.left).not.toBeUndefined()
        expect(res.left).toBeInstanceOf(TokenExpiredError)
    })

})