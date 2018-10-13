const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672', (err, conn)  => {

    conn.createChannel(  (err, ch) => {
        let fila = 'hello'

        ch.assertQueue(fila, { durable: false })
        ch.prefetch(1)

        console.log(" [*] Aguardando por mensagens na fila: %s.", fila)

        ch.consume(fila, msg => {
            console.log(" [x] Recebido %s", msg.content.toString())
        }, { noAck: true })
    })

})