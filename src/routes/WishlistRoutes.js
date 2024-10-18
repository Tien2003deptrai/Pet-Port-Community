const express = require('express');
const { WishlistController } = require('@controllers');
const { WishlistValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(WishlistValidation.create), WishlistController.create);

router.get('/', WishlistController.getAll);

router.get('/pet_owner/:petOwner_id', WishlistController.getWishlistByUser);

router.delete('/:id', validate(WishlistValidation.delete), WishlistController.delete);

router.post('/check', validate(WishlistValidation.checkItemExists), WishlistController.checkItemExists);

router.delete(
  '/pet_owner/:petOwner_id',
  validate(WishlistValidation.deleteAll),
  WishlistController.deleteAll
);

router.get(
  '/count/:petOwner_id',
  validate(WishlistValidation.countWishlistItems),
  WishlistController.countWishlistItems
);

module.exports = router;
