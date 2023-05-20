import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { LoginWithGoogleUseCaseInput, LoginWithGoogleUseCaseInterface, LoginWithGoogleUseCaseOutput } from "../../domain/useCases/loginUserWithGoogle";
import { UserRepositoryInterface } from "../interfaces/repository/user";
import { GoogleOauth2Interface } from "../interfaces/services/google";
import { JWTInterface } from "../interfaces/services/jwt";

export class LoginUserWithGoogleUseCase implements LoginWithGoogleUseCaseInterface{

    constructor(
        private readonly userRepo:UserRepositoryInterface,
        private readonly googleService:GoogleOauth2Interface,
        private readonly jwt: JWTInterface
    ){}

    async exec(input: LoginWithGoogleUseCaseInput) : Promise<Either<ErrorBase, LoginWithGoogleUseCaseOutput>>{
        const getUserInfoOrError = await this.googleService.getUserInfos(input.accessToken)
        if(getUserInfoOrError.left) return Left.create(getUserInfoOrError.left)

        const userGoogleInfos = getUserInfoOrError.right

        const userExists = await this.userRepo.findUserByEmail(userGoogleInfos.email)

        if(userExists.left) return Left.create(userExists.left)


        const durationInMileconds = 86400000 //24 in mileconds
        const token =await this.jwt.encode({id:userExists.right.id},durationInMileconds)
        if(token.left) return Left.create(token.left)

        return Right.create({
            user:{...userExists.right},
            token:token.right
        })
    }

}