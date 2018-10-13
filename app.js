const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672',  (err, conn) => {

    conn.createChannel(  (err, ch) => {
        let fila = 'hello'
		let msg  = 'Hello World 123!'
		
        ch.assertQueue(fila, { durable: false })  
		ch.sendToQueue(fila, new Buffer(msg))
		
        console.log(" [x] Sent %s", msg)
	})
	
    setTimeout( () => { conn.close(); process.exit(0) }, 500)
})