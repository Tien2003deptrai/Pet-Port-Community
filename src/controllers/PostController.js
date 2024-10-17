const { Post, User, Op, Like } = require('@models');
const { Comment, sequelize } = require('../models');

const PostController = {
  async create(req, res) {
    const { petOwner_Id, title, content, image_url } = req.body;
    try {
      const post = await Post.create({
        petOwner_Id,
        title,
        content,
        image_url,
      });
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
          {
            model: Comment,
            as: 'PostComments',
            attributes: ['id', 'content', 'createdAt'],
          },
          {
            model: Like,
            as: 'PostLikes',
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [
              sequelize.fn('COUNT', sequelize.col('PostLikes.id')),
              'likeCount',
            ],
          ],
        },
        group: ['Post.id', 'PostOwner.id', 'PostComments.id'],
      });
      res.status(201).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPaginatedAndSelectedPost(req, res) {
    const { limit, skip, select } = req.query;
    const limitValue = parseInt(limit) || 10;
    const skipValue = parseInt(skip) || 0;

    let selectedFields = null;
    let includeComments = true;

    if (select) {
      const userSelectedFields = select.split(',');
      selectedFields = ['id', ...userSelectedFields];

      includeComments = false;
    }
    try {

      const options = {
        limit: limitValue,
        where: {
          id: {
            [Op.gte]: skipValue,
          },
        },
        attributes: selectedFields ? selectedFields : undefined,
      };

      if (includeComments) {
        options.include = [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
          {
            model: Comment,
            as: 'PostComments',
            attributes: ['id', 'content', 'createdAt'],
          },
        ];
      }

      const posts = await Post.findAll(options);

      if (posts.length === 0) {
        return res.status(200).json({
          message: 'No posts found',
          posts,
        });
      }
      res.status(201).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPaginatedPosts(req, res) {
    const { limit, page } = req.query;
    const limitValue = parseInt(limit) || 10;
    const pageValue = parseInt(page) || 1;

    try {
      const options = {
        limit: limitValue,
        offset: (pageValue - 1) * limitValue,
        distinct: true,
        where: {},
      };

      options.include = [
        {
          model: User,
          as: 'PostOwner',
          attributes: ['id', 'username', 'full_name'],
        },
        {
          model: Comment,
          as: 'PostComments',
          attributes: ['id', 'content', 'createdAt'],
        },
      ];

      const { rows: posts, count: totalItems } = await Post.findAndCountAll(options);

      if (!posts.length) {
        return res.status(200).json({
          message: 'No posts found',
          posts,
        });
      }

      // Send paginated response with total count
      res.status(200).json({
        success: true,
        data: posts,
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limitValue),
          currentPage: pageValue,
        },
      });
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
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    try {
      const [updated] = await Post.update({ title, content, image_url }, { where: { id } });
      if (!updated) return res.status(404).json({ message: 'Post not found' });
      const updatedPost = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: updatedPost });
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
      const deleted = await Post.destroy({
        where: { id },
      });
      if (!deleted) return res.status(404).json({ message: 'Post not found' });
      res.status(201).json({ success: true, message: 'Detele successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPostsByUser(req, res) {
    const { petOwner_Id } = req.params;
    try {
      const posts = await Post.findAll({
        where: { petOwner_Id },
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPostsWithUserInfo(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async searchPostsByTitle(req, res) {
    const { title } = req.query;
    try {
      const posts = await Post.findAll({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getLatestPosts(req, res) {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        include: [
          {
            model: User,
            as: 'PostOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async countPosts(req, res) {
    try {
      const totalPosts = await Post.count();
      res.status(201).json({ success: true, data: totalPosts });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = PostController;
