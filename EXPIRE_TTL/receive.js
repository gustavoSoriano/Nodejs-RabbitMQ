#!/usr/bin/env node
const amqp     = require('amqplib')
const queue    = 'expired'
const exchange = 'messages_expired'

const Receive = async () => {
    let conn  = await amqp.connect('amqp://localhost:5672')
    let ch    = await conn.createChannel()

    //registra exchange
    ch.assertExchange(exchange, 'direct', {durable: false} )

    //declara fila
    ch.assertQueue(queue, { durable: false }) 

    //liga fila com exchange fazendo rota da exchange para fila
    ch.bindQueue(queue, exchange, queue)

    ch.consume(queue, msg => {
        console.log(" [x] Essa mensagem expirou na fila hello. ['%s']", msg.content.toString() )
    }, {noAck: true })
}
Receive()
