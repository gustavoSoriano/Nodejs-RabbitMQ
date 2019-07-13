const amqp     = require('amqplib')
let msg        = 'Hello World 123!'

const Producer = async () => {
    let conn   = await amqp.connect('amqp://localhost:5672')
    let ch     = await conn.createChannel()
    
    ch.assertQueue('hello', { durable: false })  
    ch.sendToQueue('hello', new Buffer.from(msg))
    
    console.log(" [x] Sent %s", msg)
    setTimeout( () => { conn.close(); process.exit(0) }, 500)
}
Producer()
