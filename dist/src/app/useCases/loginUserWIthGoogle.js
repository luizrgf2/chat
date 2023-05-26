"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserWithGoogleUseCase = void 0;
const either_1 = require("../../domain/errors/either");
class LoginUserWithGoogleUseCase {
    constructor(userRepo, googleService, jwt) {
        this.userRepo = userRepo;
        this.googleService = googleService;
        this.jwt = jwt;
    }
    async exec(input) {
        const getUserInfoOrError = await this.googleService.getUserInfos(input.accessToken);
        if (getUserInfoOrError.left)
            return either_1.Left.create(getUserInfoOrError.left);
        const userGoogleInfos = getUserInfoOrError.right;
        const userExists = await this.userRepo.findUserByEmail(userGoogleInfos.email);
        if (userExists.left)
            return either_1.Left.create(userExists.left);
        const durationInMileconds = 86400000; //24 in mileconds
        const token = await this.jwt.encode({ id: userExists.right.id }, durationInMileconds);
        if (token.left)
            return either_1.Left.create(token.left);
        return either_1.Right.create({
            user: { ...userExists.right },
            token: token.right
        });
    }
}
exports.LoginUserWithGoogleUseCase = LoginUserWithGoogleUseCase;
//# sourceMappingURL=loginUserWIthGoogle.js.map