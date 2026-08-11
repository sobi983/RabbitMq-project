export const config = {
  amqp: {
    url: `amqp://${process.env.AMQP_USERNAME || 'guest'}:${process.env.AMQP_PASSWORD || 'guest'}@${process.env.AMQP_HOST || 'localhost'}:${process.env.AMQP_PORT || 5672}/`,
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
};