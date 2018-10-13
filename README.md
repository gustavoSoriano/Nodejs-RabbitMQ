# Nodejs-RabbitMQ

```
RabbitMQ é um servidor de mensageria open source implementado para suportar mensagens 
em um protocolo denominado Advanced Message Queuing Protocol (AMQP). 
Compatível com diversas linguagens de programação,possui interface de administração
nativa além de gerenciar fila de trabalhos em background
```
[RabbitMQ](https://www.rabbitmq.com/)


## Como iniciar o projeto?
### É necessário ter docker instalado na máquina.


### 1. Configurando container Rabbit
``` 
 sudo docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```
 

### 2. Acessar interface de administração
```
Abra o browser em http://localhost:8080
```

### 3. Faça login
```
 user:  guest
 senha: guest
```

### 4. Instale as dependências do projeto
```
npm install
```

### 5. Agora é necessário inicar um worker, que ficará aguardando um job entrar na fila
Mantenha o console aberto para compreender melhor o funcionamento
```
node worker.js
```

### 6. Agora inicie o APP
Abrindo um novo terminal, execute o app.js.
```
node app.js
```

Sempre que rodar o app, este enviará um mensagem à fila, o Rabbit enviará
a mensagem ao worker que estiver disponível.

Obs: É possível subir mais de um worker.






