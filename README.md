<!-- To Start the consumer -->
npm run start

<!-- To run the replay script -->
node replay-script/index.js <dlq> <exchange> <routing-key>

<!-- Basic understanding -->
From the producer side, the exchange and the queue is created along with the dead-letter-queue and excahnge. 
If the routing key mismatched the consumer won't be able to get the messages from the queue.

<!-- In case of creation of the exchange, queues etc.. Please follow the right structure -->

vhost:       /<env>/<app>
exchange:    x.<domain>.<purpose>
queue:       q.<consumer>.<message-purpose>
routing key: <entity>.<action>
retry queue: q.<domain>.retry.<delay>
dlq:         q.<domain>.dlq

<!-- For logging the success & error -->
log/crm_error.log
log/crm_success.log