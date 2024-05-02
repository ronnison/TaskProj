const amqp = require('amqplib/callback_api');
const url = process.env['url']

amqp.connect(url, function(error0, connection) {
  if(error0){
    throw error0
  }

  connection.createChannel(function(error1, channel){
    if(error1){
      throw error1
    }

    var queue = 'task_queue'
    var msg = 'Task'

    channel.assertQueue(queue, {durable : true})

    channel.sendToQueue(queue, Buffer.from(msg), {persistent : true})

    console.log(' [x] Sent %s', msg)

    setTimeout(function(){
      connection.close()
      process.exit(0)
    }, 500)
  })
})