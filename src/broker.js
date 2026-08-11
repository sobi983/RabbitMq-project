import amqp from 'amqplib';
import { config } from './config.js';
import chalk from 'chalk';

let connection = null;
let channel = null;

/**
* @param {object}   route
* @param {Function} handler
*/
export async function startConsumer(route, handler) {
 const { exchange, queue, routingKey } = route;
 const dlx = `${exchange}.dlx`;
 const dlq = `${queue}.dlq`;

 connection = await amqp.connect(config.amqp.url);
 channel = await connection.createChannel();

 // Creating exchange and binding it with queue
 await channel.assertExchange(exchange, 'direct', { durable: true });
 await channel.assertQueue(queue, {
   durable: true,
   arguments: { 'x-dead-letter-exchange': dlx },
 });
 await channel.bindQueue(queue, exchange, routingKey);

// Creating DLX and DLQ
 await channel.assertExchange(dlx, 'fanout', { durable: true });
 await channel.assertQueue(dlq, { durable: true });
 await channel.bindQueue(dlq, dlx, ''); // fanout ignores routing key
 await channel.prefetch(1);

 // Consume logic where if the handler fails, the message is sent to DLQ else ACK is sent.
 await channel.consume(queue, async (msg) => {
   if (!msg) console.log("No message received");
   try {
     const data = JSON.parse(msg.content.toString());
     await handler(data);  //API call
     channel.ack(msg);              
     console.log(chalk.greenBright.bold('Response ACK!'));
   } catch (err) {
     console.error(chalk.redBright('Failed:', err.message));
     channel.nack(msg, false, false);
   }
 });

 console.log(chalk.yellow(`Waiting for messages on "${chalk.italic(queue)}". Ctrl+C to exit.`));
 process.on('SIGINT', shutdown); //signal interrupt
 process.on('SIGTERM', shutdown); //pm2, signal terminate
}

async function shutdown() {
 console.log('Shutting down...');
 if (channel) await channel.close();
 if (connection) await connection.close();
 process.exit(0);
}