#!/usr/bin/env node
const amqp     = require('amqplib')
let args       = process.argv.slice(2)
let prioridade = (args.length > 0) ? args[0] : 'error'
let msg        = args.slice(1).join(' ') || 'Hello World!'

const Emit = async () => {
    let conn     = await amqp.connect('amqp://localhost:5672')
    let ch       = await conn.createChannel()
    
    //declara
    ch.assertExchange('direct_logs', 'direct', { durable: false} )

    //publica na exchange criada
    ch.publish('direct_logs', prioridade, Buffer.from(msg))

    console.log(" [x] Enviado %s: '%s'", prioridade, msg)
    setTimeout(() => {conn.close();process.exit(0) }, 500)
}
Emit()



