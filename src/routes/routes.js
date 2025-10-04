const { Router } = require('express');
const petsRouter = require('./pets-routes');
const adotantesRouter = require('./adotantes-routes');
const adocoesRouter = require('./adocoes-routes');
const router = Router();

router.use('/pets', petsRouter);
router.use('/adotantes', adotantesRouter);
router.use('/adocoes', adocoesRouter);

module.exports = router;
