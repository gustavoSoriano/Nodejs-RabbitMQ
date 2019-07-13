const amqp     = require('amqplib')
let msg        = 'Mensagem expira'

const Demo     = async () => {
    let conn   = await amqp.connect('amqp://localhost:5672')
    let ch     = await conn.createChannel()
    
    //declara fila
    ch.assertQueue('expired', { durable: false })

    //QUANDO UMA MENSAGEM EXPIRAR VAI SER REDIRECIONADA PARA FILA 'expired'
    let arguments = {
        //x-expires faz com que a fila morra
        //"x-expires":10000, 

        //x-message-ttl faz com que a mensagem expire
        "x-message-ttl":6000,
        "x-dead-letter-exchange":"messages_expired",
        "x-dead-letter-routing-key": 'expired'
    }

    await ch.assertQueue('hello', { durable: false, arguments })
    ch.sendToQueue('hello', new Buffer.from(msg))
    
    console.log(" [➢] Enviado %s", msg)
    setTimeout( () => { conn.close(); process.exit(0) }, 1000)
}
Demo()

