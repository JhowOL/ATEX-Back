const express = require('express');
const comentariosController = require('../controllers/comentariosController');

const router = express.Router();

router.post('/:id/comentarios', comentariosController.create);
router.get('/:id/comentarios', comentariosController.list);

module.exports = router;
