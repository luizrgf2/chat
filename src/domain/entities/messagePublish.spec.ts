import { MessagePublishWithInvalidId, MessagePublishWithInvalidMessage, MessagePublishWithInvalidUserName, ValidMessagePublish } from "../../../test/mocks/messagePublish/messagePublish"
import { IdInvalidError } from "../errors/messagePublish/idInvalid"
import { MessageInvalidError } from "../errors/messagePublish/messageInvalid"
import { NameInvalidError } from "../errors/user/nameInvalid"
import { MessagePublishEntity } from "./messagePublish"

describe("MessagePusblishEntity tests", function(){
    it("should be able create MessagePublishEntity with valid infos", function(){
        const sut = MessagePublishEntity.create({
            ...ValidMessagePublish
        })
        expect(sut.right).toBeInstanceOf(MessagePublishEntity)
    })

    it("should be able return invaliId error if try create MessagePublishEntity with invalid id", function(){
        const sut = MessagePublishEntity.create({
            ...MessagePublishWithInvalidId
        })
        expect(sut.left).toBeInstanceOf(IdInvalidError)
    })

    it("should be able return invalidName error if try create MessagePublishEntity with invalid userName", function(){
        const sut = MessagePublishEntity.create({
            ...MessagePublishWithInvalidUserName
        })
        expect(sut.left).toBeInstanceOf(NameInvalidError)
    })

    it("should be able return invalidMessage error if try create MessagePublishEntity with invalid message", function(){
        const sut = MessagePublishEntity.create({
            ...MessagePublishWithInvalidMessage
        })
        expect(sut.left).toBeInstanceOf(MessageInvalidError)
    })
})

