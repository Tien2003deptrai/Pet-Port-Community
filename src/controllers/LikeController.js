const { Like, User, Post, Comment, Op } = require('@models');

const LikeController = {
  async create(req, res) {
    const { petOwner_Id, post_id, comment_id } = req.body;
    try {
      const like = await Like.create({
        petOwner_Id,
        post_id,
        comment_id,
      });
      res.status(200).json({ success: true, data: like });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const likes = await Like.findAll({
        include: [
          {
            model: User,
            as: 'UserLikes',
            attributes: ['id', 'username', 'full_name'],
          },
          {
            model: Post,
            as: 'Post',
            attributes: ['id', 'title'],
          },
          {
            model: Comment,
            as: 'Comment',
            attributes: ['id', 'content'],
          },
        ],
      });
      res.status(200).json({ success: true, data: likes });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getLikesByPost(req, res) {
    const { post_id } = req.params;
    try {
      const likes = await Like.findAll({
        where: { post_id },
        include: [
          {
            model: User,
            as: 'UserLikes',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: likes });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getLikesByComment(req, res) {
    const { comment_id } = req.params;
    try {
      const likes = await Like.findAll({
        where: { comment_id },
        include: [
          {
            model: User,
            as: 'UserLikes',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: likes });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async checkIfLiked(req, res) {
    const { petOwner_Id, post_id, comment_id } = req.body;
    try {
      const like = await Like.findOne({
        where: { petOwner_Id, post_id, comment_id },
      });
      res.status(200).json({ success: true, liked: !!like });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getTotalLikes(req, res) {
    const { post_id, comment_id } = req.params;
    try {
      const count = await Like.count({
        where: {
          [Op.or]: [{ post_id }, { comment_id }],
        },
      });
      res.status(200).json({ success: true, totalLikes: count });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Like.destroy({
        where: { id },
      });
      if (!deleted) return res.status(404).json({ message: 'Like not found' });
      res.status(200).json({ success: true, message: "Delete successfully" });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async deleteAllLikesByPetOwner(req, res) {
    const { petOwner_Id } = req.params;
    try {
      await Like.destroy({ where: { petOwner_Id } });
      res.status(200).json({ success: true, message: "Delete all successfully" });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = LikeController;
