const amqp     = require('amqplib')
let msg        = 'Hello World 123!'

const Demo = async () => {
    let conn   = await amqp.connect('amqp://localhost:5672')
    let ch     = await conn.createChannel()
    
    //x-message-ttl faz com que a mensagem expire
    let arguments = {"x-message-ttl":10000}

    //x-expires faz com que a fila morra
    //let arguments = {"x-expires":10000}

    await ch.assertQueue('hello', { autoDelete:false, durable: false, arguments })

    for(let i=0; i < 10000; i++)
        ch.sendToQueue('hello', new Buffer.from(msg))
    
    console.log(" [➢] Sent %s", msg)
    setTimeout( () => { conn.close(); process.exit(0) }, 1000)
}
Demo()

