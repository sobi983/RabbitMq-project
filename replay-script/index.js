import amqp from 'amqplib';
import { config } from '../src/config.js';
import chalk from 'chalk';

// Usage: node replay-script.js <dlq> <exchange> <routing-key>

const DLQ = process.argv[2];
const EXCHANGE = process.argv[3];
const ROUTING_KEY = process.argv[4];

const conn = await amqp.connect(config.amqp.url);
const ch = await conn.createConfirmChannel();

let moved = 0;

while (true) {
    const msg = await ch.get(DLQ, { noAck: false });
    console.log(chalk.bgGreen(`Got message from ${DLQ}:`, msg?.content?.toString()) + '\n');
    if (!msg) break;

    ch.publish(EXCHANGE, ROUTING_KEY, msg.content, {
        persistent: true,
        contentType: 'application/json',
        headers: msg.properties.headers,
    });

    moved++;
    await ch.waitForConfirms();
    ch.ack(msg);
}

console.log(`Replayed ${moved} messages back into ${EXCHANGE} -> q.campaign.lead`);
await ch.close();
await conn.close();
process.exit(0);