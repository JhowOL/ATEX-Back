require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.resolve(__dirname, '../src/db/migrations.sql'), 'utf8');

const connections = [
  {
    label: 'DEV',
    url: process.env.DATABASE_URL,
  },
  {
    label: 'PRODUCTION',
    url: process.env.DATABASE_URL_PRODUCTION,
  },
];

async function runMigration({ label, url }) {
  if (!url) {
    console.log(`[${label}] ⚠️  Connection string não encontrada, pulando...`);
    return;
  }
  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    await client.query(sql);
    console.log(`[${label}] ✅ Migration executada com sucesso!`);
  } catch (err) {
    console.error(`[${label}] ❌ Erro: ${err.message}`);
  } finally {
    await client.end();
  }
}

(async () => {
  for (const conn of connections) {
    await runMigration(conn);
  }
})();
