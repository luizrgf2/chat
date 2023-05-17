import { TokenExpiredError } from "../../src/app/errors/auth/tokenExpired";
import { GoogleOauth2Interface, GoogleToken, UserInformation } from "../../src/app/interfaces/services/google";
import { Either, Left, Right } from "../../src/domain/errors/either";
import { ErrorBase } from "../../src/domain/errors/errorBase";

export class InMemoryGoogleOauth2 implements GoogleOauth2Interface {
  private tokens: Record<string, GoogleToken>;
  private userInfos: Record<string, UserInformation>;

  constructor() {
    this.tokens = {};
    this.userInfos = {};
  }

  createAuthURL(): string {
    // Implementação fictícia para retornar uma URL de autenticação
    return "https://example.com/auth";
  }

  async getTokens(code: string): Promise<Either<ErrorBase, GoogleToken>> {
    // Implementação fictícia para obter tokens com base no código de autorização
    const token: GoogleToken = {
      access_token: "ACCESS_TOKEN",
      expires_in: 3600,
      id_token: "ID_TOKEN",
      scope: "profile email",
      token_type: "Bearer",
    };

    this.tokens[token.access_token] = token;

    return Promise.resolve(Right.create(token));
  }

  async getUserInfos(idToken: string): Promise<Either<ErrorBase, UserInformation>> {
    if(idToken === "invalid_token") return Left.create(new TokenExpiredError())

    const anotherUserInfo : UserInformation = {
        sub: "123456789",
        name: "John Doe",
        given_name: "John",
        family_name: "Doe",
        email: "another@example.com",
        picture: "https://example.com/profile.jpg",
        locale: "en-US",
        hd: "example.com",
      };

    const userInfo: UserInformation = {
      sub: "123456789",
      name: "John Doe",
      given_name: "John",
      family_name: "Doe",
      email: "john.doe@example.com",
      picture: "https://example.com/profile.jpg",
      locale: "en-US",
      hd: "example.com",
    };

    if(idToken === "another_token") return Right.create(anotherUserInfo)

    this.userInfos[userInfo.sub] = userInfo;

    return Promise.resolve(Right.create(userInfo));
  }
}