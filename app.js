const amqp     = require('amqplib')
let msg        = 'Hello World 123!'

const Producer = async () => {
    let conn   = await amqp.connect('amqp://localhost:5672')
    let ch     = await conn.createChannel()
    
    await ch.assertQueue('hello', { durable: false })

    for(let i=0; i < 10000; i++)
        ch.sendToQueue('hello', new Buffer.from(msg))
    
    console.log(" [➢] Sent %s", msg)
    setTimeout( () => { conn.close(); process.exit(0) }, 1000)
}
Producer()

