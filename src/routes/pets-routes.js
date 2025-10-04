const { Router } = require('express');
const petsRouter = Router();
const petController = require('../controllers/pet-controller');
const upload = require('../config/multer');

petsRouter.get('/', petController.list);
petsRouter.get('/:id', petController.show);
petsRouter.post('/', upload.single('foto'), petController.create);
petsRouter.put('/:id', upload.single('foto'), petController.update);
petsRouter.delete('/:id', petController.remove);

module.exports = petsRouter;