export const config = {
  amqp: {
    url: `amqp://${process.env.AMQP_USERNAME}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:${process.env.AMQP_PORT}/${process.env.AMQP_VHOST || ''}`,
  },

  prefetch: Number(process.env.PREFETCH || 1),

  retry: {
    max: Number(process.env.RETRY_MAX || 5),          // attempts before DLQ
    ttlMs: Number(process.env.RETRY_TTL_MS || 30000), // backoff delay per retry
  },

  http: {
    timeoutMs: Number(process.env.HTTP_TIMEOUT_MS || 15000),
  },

  crm: {
    createLeadsUrl: process.env.CRM_BASE_URI + process.env.MW_Campaign_URI,
    username: process.env.MW_USERNAME || '',
    password: process.env.MW_PASSWORD || '',
  },

  campaignExchange: {
    exchangeName: process.env.EXCHANGE_NAME,
    queue: process.env.QUEUE_NAME,
    routingKey: process.env.ROUTING_KEY,
  }
};