import { ErrorBase } from "../errorBase";

export class IdInvalidError extends ErrorBase{
    constructor(){
        super("O id não está no padrão UUID.",400)
    }
}