const db = require('../db');

async function create({ endereco, severidade, descricao, foto_url }) {
  const { rows } = await db.query(
    `INSERT INTO reports (endereco, severidade, descricao, foto_url)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [endereco, severidade, descricao || null, foto_url]
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
