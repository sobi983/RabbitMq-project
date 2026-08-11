import { startConsumer } from './broker.js';
import { campaignCreateLeads } from './handler/campaign.js';
import { config } from './config.js';

// vhost:       /<env>/<app>
// exchange:    x.<domain>.<purpose>
// queue:       q.<consumer>.<message-purpose>
// routing key: <entity>.<action>
// retry queue: q.<domain>.retry.<delay>
// dlq:         q.<domain>.dlq


startConsumer({ exchange: config.campaignExchange.exchangeName, queue: config.campaignExchange.queue, routingKey: config.campaignExchange.routingKey }, campaignCreateLeads);