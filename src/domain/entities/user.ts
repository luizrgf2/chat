import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { EmailInvalidError } from "../errors/user/emailInvalid"
import { NameInvalidError } from "../errors/user/nameInvalid"

export interface UserInterface{
    id:string
    createdAt:Date,
    updatedAt:Date,
    name:string,
    email:string,
    pictureUrl?:string,
}


export class UserEntity{
    user:UserInterface

    constructor(user:UserInterface){
        this.user = user
    }

    isValidEmail(): boolean {
        if(!this.user.email) return false
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.user.email);
    }

    isValidName(): boolean {
        if(!this.user.name) return false
        return this.user.name.length >= 4 && this.user.name.length <= 60;
    }


    static create(userData:Omit<UserInterface,"id"|"createdAt"|"updatedAt">):Either<ErrorBase,UserEntity>{
        const user = new UserEntity({
            ...userData,
            id:"",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if(!user.isValidEmail()) return Left.create(new EmailInvalidError())  
        if(!user.isValidName()) return Left.create(new NameInvalidError())      

        return Right.create(user)
    }

    static createWithoutValidations(user:UserInterface):UserEntity{
        return new UserEntity(user)
    }
}