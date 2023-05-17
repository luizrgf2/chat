import { Either } from "../../../domain/errors/either";
import { ErrorBase } from "../../../domain/errors/errorBase";


export interface GoogleToken{
    access_token:string
    expires_in:number
    id_token:string
    scope:string
    token_type:string
}

export interface UserInformation{
    sub: string,
    name: string,
    given_name: string,
    family_name: string,
    email: string,
    picture: string,
    locale: string,
    hd: string
}

export interface GoogleOauth2Interface {
    createAuthURL(): string;
    getTokens(code: string): Promise<Either<ErrorBase, GoogleToken>>;
    getUserInfos(idToken: string): Promise<Either<ErrorBase, UserInformation>>;
  }
  