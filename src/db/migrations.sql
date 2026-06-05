CREATE TABLE IF NOT EXISTS reports (
  id           SERIAL PRIMARY KEY,
  endereco     TEXT NOT NULL,
  severidade   INT NOT NULL CHECK (severidade BETWEEN 1 AND 3),
  descricao    TEXT,
  foto_url     TEXT,
  created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comentarios (
  id           SERIAL PRIMARY KEY,
  report_id    INT NOT NULL REFERENCES reports(id),
  conteudo     TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT NOW()
);
