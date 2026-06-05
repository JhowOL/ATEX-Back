const db = require('../db');

async function create({ report_id, conteudo }) {
  const { rows } = await db.query(
    `INSERT INTO comentarios (report_id, conteudo)
     VALUES ($1, $2)
     RETURNING *`,
    [report_id, conteudo]
  );
  return rows[0];
}

async function list(report_id) {
  const { rows } = await db.query(
    'SELECT * FROM comentarios WHERE report_id = $1 ORDER BY created_at ASC',
    [report_id]
  );
  return rows;
}

module.exports = { create, list };
