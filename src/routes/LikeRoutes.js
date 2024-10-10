const express = require('express');
const { LikeController } = require('@controllers');
const { LikeValidation } = require('@validations');
const router = express.Router();

router.post('/', LikeValidation.create, LikeController.create);

router.get('/', LikeController.getAll);

router.get('/post/:post_id', LikeController.getLikesByPost);

router.get('/comment/:comment_id', LikeController.getLikesByComment);

router.post('/check', LikeController.checkIfLiked);

router.get('/total/:post_id/:comment_id', LikeController.getTotalLikes);

router.delete('/:id', LikeController.delete);

router.delete('/pet_onwer/:petOwner_Id', LikeController.deleteAllLikesByPetOwner);

module.exports = router;
