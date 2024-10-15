const express = require('express');
const { CommentController } = require('@controllers');
const { CommentValidation } = require('@validations');

const router = express.Router();

router.post('/', CommentValidation.create, CommentController.create);

router.get('/', CommentController.getAll);

router.get('/with-petOwner-info', CommentController.getCommentsWithPetOwnerInfo);

router.get('/:id', CommentController.getById);

router.put('/:id', CommentController.update);

router.delete('/:id', CommentController.delete);

router.get('/post/:post_id', CommentController.getCommentsByPost);

router.get('/pet_owner/:petOwner_Id', CommentController.getCommentsByPetOwner);

router.get('/exists/:id', CommentController.checkCommentExists);

module.exports = router;
