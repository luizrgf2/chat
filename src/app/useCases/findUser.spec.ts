import { UserValid } from "../../../test/mocks/user/user"
import { InMemoryUserRepository } from "../../../test/repositories/user"
import { UserNotExistsError } from "../../domain/errors/user/userNotExists"
import { FindUserUseCase } from "./findUser"

describe("FindUserUseCase tests", function(){
    
    
    const userRepo = new InMemoryUserRepository()
    let idTest = ""
    
    it("should be able find valid user with valid id", async function(){
        await userRepo.createUser({
            email:UserValid.email,
            name:UserValid.name,
            pictureUrl:UserValid.pictureUrl
        })


        idTest = userRepo.users[0].id

        const sut = new FindUserUseCase(userRepo)
        const res = await sut.exec({
            idUser:idTest
        })

        expect(res.right).toHaveProperty("user")
        expect(res.right?.user.email).toEqual(UserValid.email)
        expect(res.right?.user.name).toEqual(UserValid.name)
        expect(res.right?.user.id).toEqual(idTest)

    })

    it("should be able return userNotExistsError if try find user with id invalid or id not exists", async function(){
        userRepo.users = []

        const sut = new FindUserUseCase(userRepo)
        const res = await sut.exec({
            idUser:"invalid_id"
        })

        expect(res.left).toBeInstanceOf(UserNotExistsError)
    })
})