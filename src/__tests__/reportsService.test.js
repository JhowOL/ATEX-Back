const reportsService = require('../services/reportsService');
const db = require('../db');

afterAll(async () => {
  await db.end();
});

describe('reportsService', () => {
  it('cria um report e retorna com id', async () => {
    const report = await reportsService.create({
      tipo: 'problema',
      endereco: 'Rua Service Test, 1',
      severidade: 1,
      descricao: null,
      foto_url: null,
    });
    expect(report).toHaveProperty('id');
    expect(report.tipo).toBe('problema');
    expect(report.endereco).toBe('Rua Service Test, 1');
    expect(report.severidade).toBe(1);
  });

  it('lista reports como array ordenado por created_at DESC', async () => {
    const reports = await reportsService.list();
    expect(Array.isArray(reports)).toBe(true);
    if (reports.length >= 2) {
      const first = new Date(reports[0].created_at);
      const second = new Date(reports[1].created_at);
      expect(first.getTime()).toBeGreaterThanOrEqual(second.getTime());
    }
  });

  it('cria elogio com severidade null', async () => {
    const report = await reportsService.create({
      tipo: 'elogio',
      endereco: 'Av. Elogio, 5',
      severidade: null,
      descricao: 'Ótimo serviço',
      foto_url: null,
    });
    expect(report.tipo).toBe('elogio');
    expect(report.severidade).toBeNull();
  });
});
