export default ({ env }: { env: any }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: ['5b9OfRZ5HRfZYgds4+YzZw==', 'w8qEOGSpYMT7+EtqLDC08Q==', '6vPgSTomMx8e7zHpvy0xuA==', 'KXVbyi8pZfQ6r+6+1E+uKA=='],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
