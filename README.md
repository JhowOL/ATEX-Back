# São Francisco Acessibilidade — API

Back-end do projeto extensionista de inclusão digital para mapeamento colaborativo de barreiras de acessibilidade urbana no bairro São Francisco, Curitiba/PR.

## Stack

- Node.js + Express
- PostgreSQL
- Multer (upload de fotos)
- Jest (testes — meta 80% de cobertura)

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

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor com hot-reload (nodemon) |
| `npm start` | Servidor em produção |
| `npm test` | Testes com cobertura |

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/reports` | Cria um report |
| GET | `/reports` | Lista todos os reports |
| POST | `/reports/:id/comentarios` | Adiciona comentário |
| GET | `/reports/:id/comentarios` | Lista comentários |

## Branches

- `master` — sempre estável
- `feature/<nome>` — criada a partir da master
