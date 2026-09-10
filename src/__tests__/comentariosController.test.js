const request = require('supertest');
const app = require('../index');
const db = require('../db');

let reportId;

beforeAll(async () => {
  const res = await request(app)
    .post('/reports')
    .field('tipo', 'problema')
    .field('endereco', 'Rua Comentario, 1')
    .field('severidade', '1');
  reportId = res.body.id;
});

afterAll(async () => {
  await db.end();
});

describe('POST /reports/:id/comentarios', () => {
  it('retorna 400 quando conteúdo está vazio', async () => {
    const res = await request(app)
      .post(`/reports/${reportId}/comentarios`)
      .send({ conteudo: '' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/conteúdo/i);
  });

  it('retorna 400 quando conteúdo está ausente', async () => {
    const res = await request(app)
      .post(`/reports/${reportId}/comentarios`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/conteúdo/i);
  });

  it('retorna 201 para comentário válido', async () => {
    const res = await request(app)
      .post(`/reports/${reportId}/comentarios`)
      .send({ conteudo: 'Comentário de teste' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.conteudo).toBe('Comentário de teste');
    expect(res.body.report_id).toBe(reportId);
  });
});

describe('GET /reports/:id/comentarios', () => {
  it('retorna 200 com array', async () => {
    const res = await request(app).get(`/reports/${reportId}/comentarios`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
