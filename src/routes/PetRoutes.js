const express = require('express');
const { PetController } = require('@controllers');
const { PetValidation } = require('@validations');
const router = express.Router();

router.post('/', PetValidation.create, PetController.create);

router.get('/', PetController.getAll);

router.get('/:id', PetController.getById);

router.put('/:id', PetController.update);

router.delete('/:id', PetController.delete);

router.get('/owner/:owner_id', PetController.getPetsByOwner);

router.get('/category/:category_id', PetController.getPetsByCategory);

router.get('/gender/:gender', PetController.getPetsByGender);

router.get('/count', PetController.countPets);

module.exports = router;
