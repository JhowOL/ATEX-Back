const errorHandler = require('../middlewares/errorHandler');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('errorHandler', () => {
  it('retorna 500 com mensagem genérica quando erro não tem status', () => {
    const err = new Error('algo deu errado');
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'algo deu errado' });
  });

  it('usa o status do erro quando definido', () => {
    const err = new Error('não encontrado');
    err.status = 404;
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'não encontrado' });
  });

  it('retorna mensagem padrão quando erro não tem message', () => {
    const err = {};
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
  });
});
