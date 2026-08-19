# São Francisco Acessibilidade — API

Back-end do projeto extensionista de inclusão digital para mapeamento colaborativo de barreiras de acessibilidade urbana no bairro São Francisco, Curitiba/PR. Permite que moradores registrem "reports" de barreiras de acessibilidade (com foto e nível de severidade) e comentem em reports existentes.

## Stack

- **Node.js + Express**
- **PostgreSQL** (`pg`), com o banco hospedado no [Neon](https://neon.tech/)
- **Multer** — upload de fotos (JPEG/PNG, até 5 MB)
- **Jest** + **Supertest** — testes (meta de 80% de cobertura de linhas)

## Arquitetura

Estrutura em camadas: rotas → controllers → services → acesso a dados via `pg`, com um middleware central de tratamento de erros.

```
src/
├── index.js                       # Bootstrap da aplicação (Express, CORS por ambiente)
├── db/
│   ├── index.js                   # Pool de conexão PostgreSQL (via DATABASE_URL)
│   └── migrations.sql             # DDL das tabelas reports e comentarios
├── middlewares/
│   └── errorHandler.js            # Handler central de erros
├── routes/
│   ├── reports.js                 # Rotas de reports (com upload via Multer)
│   └── comentarios.js             # Rotas de comentários de um report
├── controllers/
│   ├── reportsController.js
│   └── comentariosController.js
└── services/
    ├── reportsService.js          # Queries SQL de reports
    └── comentariosService.js      # Queries SQL de comentários

scripts/
└── migrate.js                     # Executa migrations.sql contra o banco de DEV e/ou PRODUCTION
```

Em produção, o CORS é restrito às origens definidas em `ALLOWED_ORIGINS`; em desenvolvimento, qualquer origem é aceita.

## Contexto

Projeto extensionista acadêmico (UNINTER — Bacharelado em Engenharia da Computação).
ODS relacionados: 03 · 10 · 11

## Instalação

```bash
npm install
cp .env.example .env
# edite .env com as credenciais do banco
npm run dev
```

Para aplicar o schema no banco (tabelas `reports` e `comentarios`):

```bash
node scripts/migrate.js
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor com hot-reload (nodemon) |
| `npm start` | Servidor em produção |
| `npm test` | Testes com cobertura |

## Variáveis de ambiente

Definidas em `.env` (veja [`.env.example`](.env.example)):

| Variável | Descrição |
|---|---|
| `PORT` | Porta da API (padrão `3000`) |
| `NODE_ENV` | `development` ou `production` — controla a política de CORS |
| `DATABASE_URL` | Connection string do PostgreSQL (Neon) |
| `ALLOWED_ORIGINS` | Origens permitidas pelo CORS em produção, separadas por vírgula |

`scripts/migrate.js` também reconhece `DATABASE_URL_PRODUCTION` para aplicar as migrations no banco de produção junto com o de desenvolvimento.

## Endpoints

Base URL local: `http://localhost:3000`

| Método | Rota | Descrição | Body |
|--------|------|-----------|------|
| `POST` | `/reports` | Cria um report (multipart/form-data) | `endereco` (string, obrigatório), `severidade` (1 a 3, obrigatório), `descricao` (opcional), `foto` (arquivo JPEG/PNG, opcional) |
| `GET` | `/reports` | Lista todos os reports, mais recentes primeiro | — |
| `POST` | `/reports/:id/comentarios` | Adiciona um comentário a um report | `{ "conteudo": string }` |
| `GET` | `/reports/:id/comentarios` | Lista os comentários de um report, em ordem cronológica | — |

## Branches

- `master` — sempre estável
- `feature/<nome>` — criada a partir da master
