const amqp   = require('amqplib')
let fila     = 'hello'

const Worker = async () => {
    let conn = await amqp.connect('amqp://localhost:5672')
    let ch   = await conn.createChannel()

    ch.assertQueue(fila, { durable: false })
    ch.prefetch(1)

    console.log(" [➢] Aguardando por mensagens na fila: %s.", fila)

    ch.consume(fila, async msg => {
        await ch.assertQueue(fila, { durable: false })

        console.log(" [✓] Recebido %s", msg.content.toString())

        ch.ack(msg)
    }, { noAck: false })
    process.once('SIGINT', () => conn.close() )
}
Worker()

