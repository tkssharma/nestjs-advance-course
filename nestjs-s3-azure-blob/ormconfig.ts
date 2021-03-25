console.log(process.env.DATABASE_URL);
module.exports = {
  type: process.env.DB_DIALECT || 'postgres',
  url: process.env.DATABASE_URL,
  charset: 'utf8mb4',
  synchronize: false,
  ssl: (process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test')
    ? { rejectUnauthorized: false }
    : false,
  logging: true,
  entities: [
    'dist/app/domain/entities/**/*.js',
  ],
  migrations: [
    'dist/migrations/**/*.js',
  ],
  subscribers: [
    'dist/subscriber/**/*.js',
  ],
  cli: {
    entitiesDir: 'src/app/domain/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
  migrationsTransactionMode: 'each'
};
