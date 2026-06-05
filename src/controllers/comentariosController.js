const comentariosService = require('../services/comentariosService');

async function create(req, res, next) {
  try {
    const { conteudo } = req.body;
    const report_id = Number(req.params.id);

    if (!conteudo) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const comentario = await comentariosService.create({ report_id, conteudo });
    res.status(201).json(comentario);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const report_id = Number(req.params.id);
    const comentarios = await comentariosService.list(report_id);
    res.json(comentarios);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list };
