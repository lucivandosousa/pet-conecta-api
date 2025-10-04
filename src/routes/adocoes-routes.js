const express = require('express');
const adocoeswRouter = express.Router();
const adocaoController = require('../controllers/adocao-controller');

adocoeswRouter.get('/', adocaoController.list);
adocoeswRouter.post('/', adocaoController.create);

module.exports = adocoeswRouter;