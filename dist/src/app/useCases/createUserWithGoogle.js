"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserWithGoogleUseCase = void 0;
const either_1 = require("../../domain/errors/either");
const emailAlreayExists_1 = require("../../domain/errors/user/emailAlreayExists");
const userNotExists_1 = require("../../domain/errors/user/userNotExists");
class CreateUserWithGoogleUseCase {
    constructor(userRepo, googleService) {
        this.userRepo = userRepo;
        this.googleService = googleService;
    }
    async exec(input) {
        const getUserInfoOrError = await this.googleService.getUserInfos(input.accessToken);
        if (getUserInfoOrError.left)
            return either_1.Left.create(getUserInfoOrError.left);
        const userGoogleInfos = getUserInfoOrError.right;
        const userExists = await this.userRepo.findUserByEmail(userGoogleInfos.email);
        if (userExists.right)
            return either_1.Left.create(new emailAlreayExists_1.EmailAlreadyExistsError());
        if (userExists.left && !(userExists.left instanceof userNotExists_1.UserNotExistsError))
            return either_1.Left.create(userExists.left);
        const createUserOrError = await this.userRepo.createUser({
            email: userGoogleInfos.email,
            name: userGoogleInfos.given_name,
            pictureUrl: userGoogleInfos.picture
        });
        if (createUserOrError.left)
            return either_1.Left.create(createUserOrError.left);
        return either_1.Right.create({
            user: createUserOrError.right
        });
    }
}
exports.CreateUserWithGoogleUseCase = CreateUserWithGoogleUseCase;
//# sourceMappingURL=createUserWithGoogle.js.map