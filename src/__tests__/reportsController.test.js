const request = require('supertest');
const app = require('../index');
const db = require('../db');

afterAll(async () => {
  await db.end();
});

describe('POST /reports', () => {
  it('retorna 400 quando tipo está ausente', async () => {
    const res = await request(app)
      .post('/reports')
      .field('endereco', 'Rua Teste, 1');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/tipo/i);
  });

  it('retorna 400 quando tipo é inválido', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'sugestao')
      .field('endereco', 'Rua Teste, 1');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/tipo/i);
  });

  it('retorna 400 quando endereço está vazio', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'problema')
      .field('endereco', '');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/endereço/i);
  });

  it('retorna 400 quando tipo=problema e severidade está ausente', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'problema')
      .field('endereco', 'Rua Teste, 1');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/severidade/i);
  });

  it('retorna 400 quando tipo=problema e severidade está fora do range', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'problema')
      .field('endereco', 'Rua Teste, 1')
      .field('severidade', '4');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/severidade/i);
  });

  it('retorna 201 para tipo=problema com todos os campos válidos', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'problema')
      .field('endereco', 'Rua Teste, 1')
      .field('severidade', '2');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.tipo).toBe('problema');
    expect(res.body.severidade).toBe(2);
  });

  it('retorna 201 para tipo=elogio sem severidade', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'elogio')
      .field('endereco', 'Av. Teste, 10');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.tipo).toBe('elogio');
    expect(res.body.severidade).toBeNull();
  });

  it('retorna 201 para tipo=elogio com severidade (aceita mesmo assim)', async () => {
    const res = await request(app)
      .post('/reports')
      .field('tipo', 'elogio')
      .field('endereco', 'Av. Teste, 10')
      .field('severidade', '1');
    expect(res.status).toBe(201);
    expect(res.body.tipo).toBe('elogio');
  });
});

describe('GET /reports', () => {
  it('retorna 200 com array', async () => {
    const res = await request(app).get('/reports');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
