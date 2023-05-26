import { TokenExpiredError } from "../app/errors/auth/tokenExpired"
import { HttpService } from "../app/interfaces/request"
import { GoogleOauth2Interface, GoogleToken, UserInformation } from "../app/interfaces/services/google"
import { GOOGLE_AUTH_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_SCOPES } from "../config"
import { Either, Left, Right } from "../domain/errors/either"
import { ErrorBase } from "../domain/errors/errorBase"
import { AxiosHttpService } from "./utils/axiosHttpService"


if(!GOOGLE_CLIENT_ID || !GOOGLE_SCOPES || !GOOGLE_REDIRECT_URI || !GOOGLE_AUTH_URI || !GOOGLE_CLIENT_SECRET) throw new Error("GOOGLE config not be is empty!")


export class GoogleOauth2 implements GoogleOauth2Interface{
    private readonly clientId:string
    private readonly scopes:string[]
    private readonly redirectUri:string
    private readonly authUri:string
    private readonly clientSecret:string

    constructor(
        private readonly request:HttpService
    ){
        
        this.clientId = GOOGLE_CLIENT_ID||""
        this.scopes = JSON.parse(GOOGLE_SCOPES||"")
        this.redirectUri = GOOGLE_REDIRECT_URI||""
        this.authUri = GOOGLE_AUTH_URI||""
        this.clientSecret = GOOGLE_CLIENT_SECRET||""
    }

    createAuthURL():string{
        const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${this.scopes.join(" ")}`
        return authorizationUrl
    }
    
    async getTokens(code:string):Promise<Either<ErrorBase,GoogleToken>>{
        const url = "https://accounts.google.com/o/oauth2/token"

        const data = {
            code: decodeURIComponent(code),
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: decodeURIComponent(this.redirectUri),
            grant_type: 'authorization_code'
        }

        const req = await this.request.post(url,data)

        if(req.status !== 200) return Left.create(new ErrorBase(String(req.data.error),req.status))

        const dataGoogle = req.data as GoogleToken

        return Right.create(dataGoogle)
    }

    async getUserInfos(idToken:string):Promise<Either<ErrorBase,UserInformation>>{
        const url = 'https://www.googleapis.com/oauth2/v3/userinfo'
        const req = await this.request.get(url,{Authorization: `Bearer ${idToken}`})

        if(req.status === 401) return Left.create(new TokenExpiredError())
        if(req.status !== 200) return Left.create(new ErrorBase(req.data.error,req.status))

        return Right.create(req.data)
    }


}

const req = new AxiosHttpService()
const google = new GoogleOauth2(req)
console.log(google.createAuthURL())