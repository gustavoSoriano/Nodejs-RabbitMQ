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

## Envio e recebimento simples de mensagem
Inicie o consumidor da fila
```
node worker.js
```

Inicie o envio:
```
node app.js
```

Sempre que rodar o app, este enviará um mensagem à fila, o Rabbit enviará
a mensagem ao worker que estiver disponível.



## RPC - Chamada de Procedimento Remoto. Para envio e resposta imediata mesmo que em servidores remoto:
Inicie o canal no server que irá receber a solicitação
```
node RPC/rpc_server.js
```

Inicie o cliente que fará a solicitação e aguardará por resposta imediata:
Informe um número qualquer como argumento para teste
```
node RPC/rpc_client.js 1000
```


## EXCHANGE - Permite definir seletivamente o tipo de mensagem que um worker pretende receber
Inicie o script que receberá as mensagens da exchange, porém, somente as que conferem com o critério de prioridade informado:
```
node EXCHANGE/receive_logs_direct.js
```

Inicie o script que publica na exchange criada.
Informe um critério de prioridade qualquer como argumento para teste. o padrão é 'error'. No ex: info foi informado
```
node EXCHANGE/emit_log_direct.js info
```


