#!/usr/bin/env node

//RPC -> Chamada de Procedimento Remoto
const amqp = require('amqplib')

let args   = process.argv.slice(2)
if (args.length == 0) 
{
  console.log("É necessário passar um argumento")
  process.exit(1)
}

const RPC_Client = async () => {
    let conn   = await amqp.connect('amqp://localhost:5672')
    let ch     = await conn.createChannel()
    
    let q             = await ch.assertQueue('', { exclusive: true } )
    let correlationId = generateUuid()
    let num           = parseInt(args[0])

    console.log(' [x] Enviando ao servidor (%d)', num)
    ch.sendToQueue('rpc_queue', Buffer.from( num.toString() ), { correlationId, replyTo: q.queue })


    ch.consume(q.queue, msg => {
        if (msg.properties.correlationId == correlationId) 
        {
            console.log(' [.] Resposta do servidor %s', msg.content.toString())
            setTimeout( () => { 
                conn.close()
                process.exit(0) 
            }, 500)
        }
    }, { noAck: true })
}
RPC_Client()


const generateUuid = () => Math.random().toString() + Math.random().toString() + Math.random().toString()