import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { EmailAlreadyExistsError } from "../../domain/errors/user/emailAlreayExists";
import { UserNotExistsError } from "../../domain/errors/user/userNotExists";
import { CreateUserWithGoogleUseCaseInput, CreateUserWithGoogleUseCaseInterface, CreateUserWithGoogleUseCaseOutput } from "../../domain/useCases/createUserWithGoogle";
import { UserRepositoryInterface } from "../interfaces/repository/user";
import { GoogleOauth2Interface } from "../interfaces/services/google";

export class CreateUserWithGoogleUseCase implements CreateUserWithGoogleUseCaseInterface{
    
    constructor(
        private readonly userRepo:UserRepositoryInterface,
        private readonly googleService:GoogleOauth2Interface
    ){}
    
    async exec(input: CreateUserWithGoogleUseCaseInput) : Promise<Either<ErrorBase, CreateUserWithGoogleUseCaseOutput>>{

        const getUserInfoOrError = await this.googleService.getUserInfos(input.accessToken)
        if(getUserInfoOrError.left) return Left.create(getUserInfoOrError.left)

        const userGoogleInfos = getUserInfoOrError.right

        const userExists = await this.userRepo.findUserByEmail(userGoogleInfos.email)
        if(userExists.right) return Left.create(new EmailAlreadyExistsError())
        if(userExists.left &&  !(userExists.left instanceof UserNotExistsError)) return Left.create(userExists.left)



        const createUserOrError = await this.userRepo.createUser({
            email:userGoogleInfos.email,
            name:userGoogleInfos.given_name,
            pictureUrl:userGoogleInfos.picture
        })

        if(createUserOrError.left) return Left.create(createUserOrError.left)
        return Right.create({
            user:createUserOrError.right
        })
    }

}