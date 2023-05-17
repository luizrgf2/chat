import { InMemoryUserRepository } from "../../../test/repositories/user"
import { InMemoryGoogleOauth2 } from "../../../test/services/google"
import { EmailAlreadyExistsError } from "../../domain/errors/user/emailAlreayExists"
import { TokenExpiredError } from "../errors/auth/tokenExpired"
import { CreateUserWithGoogleUseCase } from "./createUserWithGoogle"

describe("createUserWithGoogleUseCase tests", function(){

    const repo = new InMemoryUserRepository()
    const google = new InMemoryGoogleOauth2()

    it("should be create valid user with valid access_token", async function(){
        const sut = new CreateUserWithGoogleUseCase(repo,google)

        const res = await sut.exec({
            access_token:"valid_token"
        })

        expect(res.right).not.toBeUndefined()
        expect(res.right).toHaveProperty("user")
        expect(res.right?.user).toHaveProperty("id")
        expect(res.right?.user).toHaveProperty("name")
        expect(res.right?.user).toHaveProperty("email")
    })

    it("should be able return error create user with invalid access_token", async function(){
        const sut = new CreateUserWithGoogleUseCase(repo,google)

        const res = await sut.exec({
            access_token:"invalid_token"
        })

        expect(res.left).not.toBeUndefined()
        expect(res.left).toBeInstanceOf(TokenExpiredError)
    })

    it("should be able return error create user already exists", async function(){
        const sut = new CreateUserWithGoogleUseCase(repo,google)

        const res = await sut.exec({
            access_token:"valid_token"
        })

        expect(res.left).not.toBeUndefined()
        expect(res.left).toBeInstanceOf(EmailAlreadyExistsError)
    })

})