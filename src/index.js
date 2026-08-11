import { startConsumer } from './broker.js';
import { campaignCreateLeads } from './handler/campaign.js';

// vhost:       /<env>/<app>
// exchange:    x.<domain>.<purpose>
// queue:       q.<consumer>.<message-purpose>
// routing key: <entity>.<action>
// retry queue: q.<domain>.retry.<delay>
// dlq:         q.<domain>.dlq


startConsumer({ exchange: 'x.campaign.lead', queue: 'q.campaign.lead', routingKey: 'campaign.created' }, campaignCreateLeads);