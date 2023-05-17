import { UserValid } from "../../../test/mocks/user/user"
import { UserInterface } from "../../domain/entities/user"
import { UserNotExistsError } from "../../domain/errors/user/userNotExists"
import { PrismaUserRepository } from "./prismaUser"

describe("tests to PrismaUserRepository", function(){


    const sut = new PrismaUserRepository()

    let idToTest = ""

    it("should be able create valid user and return user created", async function(){
        const user = await sut.createUser({
            email:UserValid.email,
            name:UserValid.name,
            pictureUrl:UserValid.pictureUrl
        })

        expect(user.right).not.toBeUndefined()
        expect(user.right).toHaveProperty("id")
        expect(user.right).toHaveProperty("email")
        expect(user.right).toHaveProperty("name")
        idToTest = user.right?.id || ""
    })


    it("should be able find user with valid id", async function(){
        const user = await sut.findUserById(idToTest)

        expect(user.right).not.toBeUndefined()
        expect(user.right).toHaveProperty("id")
        expect(user.right).toHaveProperty("email")
        expect(user.right).toHaveProperty("name")
    })

    it("should be able find user with valid email", async function(){
        const user = await sut.findUserByEmail(UserValid.email)

        expect(user.right).not.toBeUndefined()
        expect(user.right).toHaveProperty("id")
        expect(user.right).toHaveProperty("email")
        expect(user.right).toHaveProperty("name")
    })

    it("should be able update user with valid id", async function(){

        const update = {
            email:"teste@gmail.com",
            name:"teste"
        } as UserInterface

        const user = await sut.updateUser({
            ...update
        },idToTest)

        expect(user.right).not.toBeUndefined()
        expect(user.right).toHaveProperty("id")
        expect(user.right).toHaveProperty("email")
        expect(user.right).toHaveProperty("name")

        expect(user.right?.email).toEqual(update.email)
        expect(user.right?.name).toEqual(update.name)
    })

    it("should be able delete user with valid id", async function(){


        const user = await sut.deleteUser(idToTest)

        expect(user.left).toBeUndefined()
        
        const userFind = await sut.findUserById(idToTest)
        expect(userFind.left).toBeInstanceOf(UserNotExistsError)

    })

})  