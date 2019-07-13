#!/usr/bin/env node

//RPC -> Chamada de Procedimento Remoto
const amqp = require('amqplib')

const RPC_Server = async () => {
    let conn     = await amqp.connect('amqp://localhost:5672')
    let ch       = await conn.createChannel()
    
    await ch.assertQueue("rpc_queue", { durable: false })
    ch.prefetch(1)

    ch.consume("rpc_queue", reply => {
        let {replyTo, correlationId} = reply.properties

        let n = parseInt(reply.content.toString())
        console.log(" [x] Servidor recebeu (%d) e devolveu uma resposta", n)
  
        let r = new Date().toISOString()
        ch.sendToQueue( replyTo, Buffer.from( r.toString() ), { correlationId } )
        ch.ack(reply)
    })
}
RPC_Server()


