import { Pool } from 'pg';

const PG_URI = 'postgres://ydyxfzdq:RTgagprN9IEBk2TnEKvRN7TZQ6g1u83b@mahmud.db.elephantsql.com/ydyxfzdq';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text: any, params: any, callback: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback)
  }
};