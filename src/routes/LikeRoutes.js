const express = require('express');
const { LikeController } = require('@controllers');
const { LikeValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', LikeValidation.create, LikeController.create);

router.get('/', LikeController.getAll);

router.get('/post/:post_id', validate(LikeValidation.getLikesByPost), LikeController.getLikesByPost);

router.get('/comment/:comment_id', validate(LikeValidation.getLikesByComment), LikeController.getLikesByComment);

router.post('/check', validate(LikeValidation.checkIfLiked), LikeController.checkIfLiked);

router.get('/total/:post_id/:comment_id', validate(LikeValidation.getTotalLikes), LikeController.getTotalLikes);

router.delete('/:id', validate(LikeValidation.delete), LikeController.delete);

router.delete('/pet_onwer/:petOwner_Id', validate(LikeValidation.deleteAllLikesByUser), LikeController.deleteAllLikesByPetOwner);

module.exports = router;
