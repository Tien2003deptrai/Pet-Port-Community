const express = require('express');
const { WishlistController } = require('@controllers');
const { WishlistValidation } = require('@validations');
const router = express.Router();

router.post('/', WishlistValidation.create, WishlistController.create);

router.get('/', WishlistController.getAll);

router.get('/pet_owner/:petOwner_id', WishlistController.getWishlistByUser);

router.delete('/:id', WishlistValidation.delete, WishlistController.delete);

router.post(
  '/check',
  WishlistValidation.checkItemExists,
  WishlistController.checkItemExists,
);

router.delete(
  '/pet_owner/:petOwner_id',
  WishlistValidation.deleteAll,
  WishlistController.deleteAll,
);

router.get(
  '/count/:petOwner_id',
  WishlistValidation.countWishlistItems,
  WishlistController.countWishlistItems,
);

module.exports = router;
