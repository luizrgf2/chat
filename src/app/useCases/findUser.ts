import { Either, Left, Right } from "../../domain/errors/either";
import { ErrorBase } from "../../domain/errors/errorBase";
import { FindUserUseCaseInput, FindUserUseCaseInterface, FindUserUseCaseOutput } from "../../domain/useCases/findUser";
import { UserRepositoryInterface } from "../interfaces/repository/user";

export class FindUserUseCase implements FindUserUseCaseInterface{

    constructor(
        private readonly userRepository:UserRepositoryInterface
    ){}

    async exec (input: FindUserUseCaseInput) : Promise<Either<ErrorBase, FindUserUseCaseOutput>>{
        const {idUser} = input
        const user = await this.userRepository.findUserById(idUser)

        if(user.left) return Left.create(user.left)
        return Right.create({
            user:user.right
        })
    }

}