const { Router } = require('express');
const adotantesRouter = Router();
const adotanteController = require('../controllers/adotante-controller');

adotantesRouter.get('/', adotanteController.list);
adotantesRouter.get('/:id', adotanteController.show);
adotantesRouter.post('/', adotanteController.create);
adotantesRouter.put('/:id', adotanteController.update);
adotantesRouter.delete('/:id', adotanteController.remove);

module.exports = adotantesRouter;