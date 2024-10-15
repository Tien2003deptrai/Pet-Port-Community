const { Comment, User } = require('@models');

const CommentController = {
  async create(req, res) {
    const { post_id, petOwner_Id, content } = req.body;
    try {
      const comment = await Comment.create({
        post_id,
        petOwner_Id,
        content,
      });
      res.status(200).json({ success: true, data: comment });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            as: 'CommentUser',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id, {
        include: [
          {
            model: User,
            as: 'CommentUser',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      if (!comment)
        return res.status(404).json({ message: 'Comment not found' });
      res.status(200).json({ success: true, data: comment });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const [updated] = await Comment.update({ content }, { where: { id } });
      if (!updated)
        return res.status(404).json({ message: 'Comment not found' });
      const updatedComment = await Comment.findByPk(id, {
        include: [
          {
            model: User,
            as: 'CommentUser',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: updatedComment });
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
      const deleted = await Comment.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({ message: 'Comment not found' });
      res.status(200).json({ success: true, message: "Delete successfully" });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getCommentsByPost(req, res) {
    const { post_id } = req.params;
    try {
      const comments = await Comment.findAll({
        where: { post_id },
        include: [
          {
            model: User,
            as: 'CommentUser',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getCommentsByPetOwner(req, res) {
    const { petOwner_Id } = req.params;
    try {
      const comments = await Comment.findAll({
        where: { petOwner_Id },
        include: [
          {
            model: User,
            as: 'CommentUser',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getCommentsWithPetOwnerInfo(req, res) {
    try {
      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            as: 'CommentUser',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async checkCommentExists(req, res) {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment)
        return res.status(404).json({ message: 'Comment not found' });
      res.status(200).json({ message: 'Comment exists' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = CommentController;
