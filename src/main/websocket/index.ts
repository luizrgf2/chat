import { io } from "../../infra/utils/websocketsConnection";
import { ProcessingMessageMessageBrockerFactory } from "../../presentation/factory/processingMessageMessageBrocker";


io.on("connection",(socket)=>{
    console.log(`Cliente conectado: ${socket.id}`);

    const processingMessage = ProcessingMessageMessageBrockerFactory.handle()

    processingMessage.exec({
        idClientSocket:socket.id
    })

    socket.on("mensagem",(msg)=>{
        console.log(msg)
    })

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
        processingMessage.closeConsummer().then(value=>{
            if(value.left){
                console.log("Falha para fecha a conexão!")
            }
        })
    });

})