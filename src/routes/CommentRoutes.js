const express = require('express');
const { CommentController } = require('../controllers');
const CommentValidation = require('../validations/CommentValidation');
const router = express.Router();

router.post('/', CommentValidation.create, CommentController.create);

router.get('/', CommentController.getAll);

router.get('/:id', CommentController.getById);

router.put('/:id', CommentController.update);

router.delete('/:id', CommentController.delete);

router.get('/post/:post_id', CommentController.getCommentsByPost);

router.get('/user/:user_id', CommentController.getCommentsByUser);

router.get('/with-user-info', CommentController.getCommentsWithUserInfo);

router.get('/exists/:id', CommentController.checkCommentExists);

module.exports = router;
