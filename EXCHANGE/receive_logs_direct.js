#!/usr/bin/env node
const amqp = require('amqplib')
let worker_prioridade_types = ["warning", "error"]

const Receive = async () => {
    let conn  = await amqp.connect('amqp://localhost:5672')
    let ch    = await conn.createChannel()

    ch.assertExchange('direct_logs', 'direct', {durable: false} )

    //cria uma fila anônima para se registrar na exchange
    let q = await ch.assertQueue('', { exclusive: true }) 
    
    console.log(' [*] Aguardando por mensagens')

    //filtra qual tipo de prioridade de mensagem deseja receber
    worker_prioridade_types.forEach( prioridade => ch.bindQueue(q.queue, 'direct_logs', prioridade) )

    ch.consume(q.queue, msg => {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString() )
    }, {noAck: true })
}
Receive()


