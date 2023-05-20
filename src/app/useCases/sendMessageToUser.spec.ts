import { MessagePublishWithInvalidId, MessagePublishWithInvalidMessage, MessagePublishWithInvalidUserName, ValidMessagePublish } from "../../../test/mocks/messagePublish/messagePublish"
import { InMemoryPublishMessage } from "../../../test/repositories/publisherMessage"
import { IdInvalidError } from "../../domain/errors/messagePublish/idInvalid"
import { MessageInvalidError } from "../../domain/errors/messagePublish/messageInvalid"
import { NameInvalidError } from "../../domain/errors/user/nameInvalid"
import { SendMessageToUserUseCase } from "./sendMessageToUser"

describe("SendMessageToUserUseCase tests", function(){

    const pubMessage = new InMemoryPublishMessage()

    it("shold be able send valid message", async function(){
        const sut = new SendMessageToUserUseCase(pubMessage)
        const res = await sut.exec({
            message:{
                ...ValidMessagePublish
            }
        })
        expect(res.right).toHaveProperty("message")
        expect(res.right?.message).toEqual(ValidMessagePublish.message)
    })

    it("shold be able return idInvalid if try send message with invalid id", async function(){
        const sut = new SendMessageToUserUseCase(pubMessage)
        const res = await sut.exec({
            message:{
                ...MessagePublishWithInvalidId
            }
        })
        expect(res.left).toBeInstanceOf(IdInvalidError)
    })

    it("shold be able return nameInvalid if try send message with invalid userName", async function(){
        const sut = new SendMessageToUserUseCase(pubMessage)
        const res = await sut.exec({
            message:{
                ...MessagePublishWithInvalidUserName
            }
        })
        expect(res.left).toBeInstanceOf(NameInvalidError)
    })


    it("shold be able return messageInvalid if try send message with invalid Message", async function(){
        const sut = new SendMessageToUserUseCase(pubMessage)
        const res = await sut.exec({
            message:{
                ...MessagePublishWithInvalidMessage
            }
        })
        expect(res.left).toBeInstanceOf(MessageInvalidError)
    })

})