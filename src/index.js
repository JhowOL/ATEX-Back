require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reportsRouter = require('./routes/reports');
const comentariosRouter = require('./routes/comentarios');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = process.env.NODE_ENV === 'production'
  ? { origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [] }
  : { origin: true }; // dev: aceita qualquer origem

app.use(cors(corsOptions));

app.use(express.json());

app.use('/reports', reportsRouter);
app.use('/reports', comentariosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
