import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { LoginWithGoogleUseCaseInput, LoginWithGoogleUseCaseInterface, LoginWithGoogleUseCaseOutput } from "../../domain/useCases/loginUserWithGoogle";
import { UserRepositoryInterface } from "../interfaces/repository/user";
import { GoogleOauth2Interface } from "../interfaces/services/google";

export class LoginUserWithGoogleUseCase implements LoginWithGoogleUseCaseInterface{

    constructor(
        private readonly userRepo:UserRepositoryInterface,
        private readonly googleService:GoogleOauth2Interface
    ){}

    async exec(input: LoginWithGoogleUseCaseInput) : Promise<Either<ErrorBase, LoginWithGoogleUseCaseOutput>>{
        const getUserInfoOrError = await this.googleService.getUserInfos(input.accessToken)
        if(getUserInfoOrError.left) return Left.create(getUserInfoOrError.left)

        const userGoogleInfos = getUserInfoOrError.right

        const userExists = await this.userRepo.findUserByEmail(userGoogleInfos.email)

        if(userExists.left) return Left.create(userExists.left)

        return Right.create({
            user:{...userExists.right}
        })
    }

}