CREATE TABLE IF NOT EXISTS reports (
  id           SERIAL PRIMARY KEY,
  tipo         TEXT NOT NULL CHECK (tipo IN ('problema', 'elogio')),
  endereco     TEXT NOT NULL,
  severidade   INT CHECK (severidade BETWEEN 1 AND 3),
  descricao    TEXT,
  foto_url     TEXT,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Adiciona coluna tipo em bancos existentes (idempotente)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'tipo'
  ) THEN
    ALTER TABLE reports ADD COLUMN tipo TEXT NOT NULL DEFAULT 'problema' CHECK (tipo IN ('problema', 'elogio'));
  END IF;
END $$;

-- Severidade passa a ser opcional (nullable)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'severidade'
      AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE reports ALTER COLUMN severidade DROP NOT NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS comentarios (
  id           SERIAL PRIMARY KEY,
  report_id    INT NOT NULL REFERENCES reports(id),
  conteudo     TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT NOW()
);
