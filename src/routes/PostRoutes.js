const express = require('express');
const { PostController } = require('../controllers');
const PostValidation = require('../validations/PostValidation');
const router = express.Router();

router.post('/', PostValidation.create, PostController.create);

router.get('/', PostController.getAll);

router.get('/with-user-info', PostController.getPostsWithUserInfo);

router.get('/search', PostController.searchPostsByTitle);

router.get('/latest', PostController.getLatestPosts);

router.get('/count', PostController.countPosts);

router.get('/:id', PostController.getById);

router.put('/:id', PostController.update);

router.delete('/:id', PostController.delete);

router.get('/user/:user_id', PostController.getPostsByUser);

module.exports = router;
