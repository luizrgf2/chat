import express,{Express} from "express"
import cors from "cors"
import { routes } from "../routes"

class ExpressServer{
    app:Express

    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    private middleware(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors())
    }

    private routes(){
        this.app.use(routes)
    }

    public start(port?:number){
        const portFinal = port === undefined ? 8080 : port
        this.app.listen(portFinal,()=>{
            console.log(`Server express is started in http://localhost:${portFinal}`)
        })
    }
}

export const App = new ExpressServer()