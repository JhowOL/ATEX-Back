const reportsService = require('../services/reportsService');

async function create(req, res, next) {
  try {
    const { endereco, severidade, descricao } = req.body;
    const tipo = req.body.tipo?.toLowerCase();

    if (!tipo || !['problema', 'elogio'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo deve ser "problema" ou "elogio"' });
    }

    if (!endereco) {
      return res.status(400).json({ error: 'Endereço é obrigatório' });
    }

    let sev = null;
    if (tipo === 'problema') {
      sev = Number(severidade);
      if (!sev || sev < 1 || sev > 3) {
        return res.status(400).json({ error: 'Severidade deve ser 1, 2 ou 3' });
      }
    } else if (severidade) {
      sev = Number(severidade);
      if (sev < 1 || sev > 3) {
        return res.status(400).json({ error: 'Severidade deve ser 1, 2 ou 3' });
      }
    }

    const foto_url = req.file ? req.file.path : null;

    const report = await reportsService.create({ tipo, endereco, severidade: sev, descricao, foto_url });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const reports = await reportsService.list();
    res.json(reports);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list };
