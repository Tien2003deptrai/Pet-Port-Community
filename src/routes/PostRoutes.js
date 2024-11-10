const express = require('express');
const { PostController } = require('@controllers');
const { PostValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(PostValidation.create), PostController.create);

router.get('/', PostController.getPaginatedAndSelectedPost);

router.get('/paginated', PostController.getPaginatedPosts);

router.get('/all', PostController.getAll);

router.get('/with-user-info', PostController.getPostsWithUserInfo);

router.get(
  '/search',
  validate(PostValidation.searchPostsByTitle),
  PostController.searchPostsByTitle
);

router.get('/latest', PostController.getLatestPosts);

router.get('/count', PostController.countPosts);

router.get('/:id', validate(PostValidation.getById), PostController.getById);

router.put('/:id', validate(PostValidation.update), PostController.update);

router.delete('/:id', validate(PostValidation.delete), PostController.delete);

router.get(
  '/pet_owner/:petOwner_Id',
  validate(PostValidation.getPostsByUser),
  PostController.getPostsByUser
);

router.put('/:id/like', validate(PostValidation.updateLikeCount), PostController.updateLikeCount);

module.exports = router;
