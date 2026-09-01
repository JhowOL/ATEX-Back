const db = require('../db');

async function create({ tipo, endereco, severidade, descricao, foto_url }) {
  const { rows } = await db.query(
    `INSERT INTO reports (tipo, endereco, severidade, descricao, foto_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [tipo, endereco, severidade || null, descricao || null, foto_url]
  );
  return rows[0];
}

async function list() {
  const { rows } = await db.query(
    'SELECT * FROM reports ORDER BY created_at DESC'
  );
  return rows;
}

module.exports = { create, list };
