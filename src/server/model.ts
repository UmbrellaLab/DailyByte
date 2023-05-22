const { Pool } = require('pg');

const PG_URL = ''

const pool = new Pool({
  connectionString: PG_URL
})