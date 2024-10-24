const express = require('express');
const { PetController } = require('@controllers');
const { PetValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(PetValidation.create), PetController.create);

router.get('/', PetController.getAll);

router.get('/count', PetController.countPets);

router.get('/:id', validate(PetValidation.getById), PetController.getById);

router.put('/:id', validate(PetValidation.update), PetController.update);

router.delete('/:id', validate(PetValidation.delete), PetController.delete);

router.get('/owner/:owner_id', validate(PetValidation.getPetsByOwner), PetController.getPetsByOwner);

router.get('/category/:category_id', validate(PetValidation.getPetsByCategory), PetController.getPetsByCategory);

router.get('/gender/:gender', validate(PetValidation.getPetsByGender), PetController.getPetsByGender);

module.exports = router;
