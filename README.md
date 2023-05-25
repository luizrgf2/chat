
<img 
    src="documentation/images/chatAppLogo.png" style="border-radius : 20px; width : 400px;">
<img>



<h1>CHAT APP</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/luizrgf2/chat/blob/main/LICENSE)

## SOBRE O PROJETO 

O projeto ChatApp é bem simples de entender, é um chat de troca de mensagens entre usuários, mas o interessante da aplicação é a maneira como ela foi desenvolvida, porém por agora não entraremos em detalhes de implementação, vamos focar no funcionamento antes de entender como foi feita.

### FUNCIONAMENTO DA APLICAÇÃO

* Criar usuários com conta google.
    ```
    A aplicação exigirá que uma conta do google sejá usada para registrar o usuário.
    ```
* Fazer login com conta google.
    ```
    A aplicação exigirá um login usando a conta google que você usou para criar o usuário.
    ```
* Encontrar usuários para trocar mensagens de texto
    ```
    Depois do login será possivel trocar mensagens de texto entre todos os usuários cadastrados.
    ```
### DESAFIOS


Desde o começo quando eu tive a ideia para desenvolver esta aplicação, eu estava pensando em alguma aplicabilidade para um message broker e logo pensei em um chat de troca de mensagens, onde todos os usuários poreriam ver e mandar mensagens. Logo em seguida, achei que poderia usar algum sistema de autenticação para enriquecer e deixar a aplicação mais profissional. Alem de tudo isso, eu escolhi usar a api do googe para fazer toda a parte de autenticação.

A principio acreditei que seria algo trivial de ser criado, pois eu já tinha consumido a api do google outras vezes, já integrei o banco mysql a uma aplicação centenas de vezes, porem usar um message brocker foi algo completamete novo, e eu teria que entender o padrão [**publish/subcribe**](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html) que a documentação do rabbitmq fornece, e eu acabei me confundindo muitas vezes sobre como funcionava, mas felizmente o desafio foi superado.

### PADRÃO PUBLISH/SUBSCRIBE

Eu tentarei passar minha visão sobre esse padrão da maneira mais simples possivel. O **RabbitMQ** ultiliza alguns padrões para definir quem cria e quem recebe a mensagem. Nesse sentido, quem cria a mensagem é chamado **Producer** e quem recebe a mensagem é chamado **Consumer**, da maneira mais simples possivel, esse padrão envia qualquer mensagem criada pelo **Producer** para todos os **Consumers** que estejam conectados ao **Producer**

### TECNOLOGIAS USADAS

 * expressjs
 * rabbitmq
 * socket.io
 * jsonWebToken
 * google Oauth2
 * prisma
 * mysql

### TECNICAS DE SOFTWARE

* Arquitetura limpa
* Testes unitatios
* Padrões de projeto
     ```
     Factory
     Repository
     Dependecy Injection
     ```

### TELAS DA APLICAÇÃO
    
 * LOGIN E REGISTRO DE USUÁRIO USANDO O GOOGLE
 <img src="documentation/images/login.png"></img>

  * TELA DE CHAT EM TEMPO REAL
 <img src="documentation/images/chat.png"></img>

### APLICAÇÃO FUNCIONANDO
 <img src="documentation/images/appRun.gif"></img>