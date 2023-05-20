import {  MessagePublishWithInvalidMessage, ValidMessagePublish } from "../../../test/mocks/messagePublish/messagePublish"
import { UserValid, UserWithInvalidName } from "../../../test/mocks/user/user"
import { InMemoryPublishMessage } from "../../../test/repositories/publisherMessage"
import { InMemoryUserRepository } from "../../../test/repositories/user"
import { IdInvalidError } from "../../domain/errors/messagePublish/idInvalid"
import { MessageInvalidError } from "../../domain/errors/messagePublish/messageInvalid"
import { NameInvalidError } from "../../domain/errors/user/nameInvalid"
import { SendMessageToUserUseCase } from "./sendMessageToUser"

describe("SendMessageToUserUseCase tests", function(){

    const pubMessage = new InMemoryPublishMessage()
    const userRepo = new InMemoryUserRepository()

    
    it("shold be able send valid message", async function(){
        userRepo.users.push({
            createdAt:new Date(),
            updatedAt:new Date(),
            email:UserValid.email,
            id:UserValid.id,
            name:UserValid.name,
            pictureUrl:UserValid.pictureUrl
        })

        const sut = new SendMessageToUserUseCase(pubMessage,userRepo)
        const res = await sut.exec({
            idUser:UserValid.id,
            message:ValidMessagePublish.message
        })
        expect(res.right).toHaveProperty("message")
        expect(res.right?.message).toEqual(ValidMessagePublish.message)
    })

    it("shold be able return idInvalid if try send message with invalid id", async function(){
        userRepo.users = []
        userRepo.users.push({
            createdAt:new Date(),
            updatedAt:new Date(),
            email:UserValid.email,
            id:"1",
            name:UserValid.name,
            pictureUrl:UserValid.pictureUrl
        })
        const sut = new SendMessageToUserUseCase(pubMessage,userRepo)
        const res = await sut.exec({
            idUser:"1",
            message:ValidMessagePublish.message
        })
        expect(res.left).toBeInstanceOf(IdInvalidError)
    })

    it("shold be able return nameInvalid if try send message with invalid userName", async function(){
        userRepo.users = []
        userRepo.users.push({
            createdAt:new Date(),
            updatedAt:new Date(),
            email:UserWithInvalidName.email,
            id:UserWithInvalidName.id,
            name:UserWithInvalidName.name,
            pictureUrl:UserWithInvalidName.pictureUrl
        })
        const sut = new SendMessageToUserUseCase(pubMessage,userRepo)
        const res = await sut.exec({
            idUser:UserWithInvalidName.id,
            message:ValidMessagePublish.message
        })
        expect(res.left).toBeInstanceOf(NameInvalidError)
    })


    it("shold be able return messageInvalid if try send message with invalid Message", async function(){
        userRepo.users = []
        userRepo.users.push({
            createdAt:new Date(),
            updatedAt:new Date(),
            email:UserValid.email,
            id:UserValid.id,
            name:UserValid.name,
            pictureUrl:UserValid.pictureUrl
        })
        const sut = new SendMessageToUserUseCase(pubMessage,userRepo)
        const res = await sut.exec({
            idUser:UserValid.id,
            message:MessagePublishWithInvalidMessage.message
        })
        expect(res.left).toBeInstanceOf(MessageInvalidError)
    })

})