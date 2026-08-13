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



<!-- Server Side setup -->
You can find the consumer side in /opt folder. Where the user that has priviledge to it is bidaya.

Two users for the rabbitmq server is available
1. bidaya_app
2. admin_sobi

Two vhosts 
1. bidaya_uat
2. bidaya_prod

Also enabled the firewall on OS and allowed 5672 port only open for Producer server no other than that.

<!-- Replay Script -->
In case of messages failure they will go to dlq. To move the messages from dlq to .q, just run the script. 

COMMAND:- node replay-script.js <dlq> <exchange> <routing-key>