import { Either } from "../../domain/errors/either"
import { ErrorBase } from "../../domain/errors/errorBase"
import { HttpRequest, HttpResponse } from "./http"




export interface ControllerInterface{
    validateInputFields?:(body:any)=>Either<ErrorBase,void>
    exec:(input:HttpRequest)=>Promise<HttpResponse>
}