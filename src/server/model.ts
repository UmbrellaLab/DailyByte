import { Pool } from 'pg';
require('dotenv').config()

const PG_URI = process.env.SQL_DB;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text: any, params: any, callback: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback)
  }
};