import { Pool } from 'pg';

const PG_URI = '';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text: any, params: any, callback: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback)
  }
};