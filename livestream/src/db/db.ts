import * as dotenv from 'dotenv';
dotenv.config();

const db = require('knex')({
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  debug: true
});

export default db;