const { Post, User, Op } = require('../models');

const PostController = {
	async create(req, res) {
		const { user_id, title, content, image_url } =
			req.body;
		try {
			const post = await Post.create({
				user_id,
				title,
				content,
				image_url,
			});
			res.status(201).json(post);
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
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			res.json(posts);
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
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			if (!post)
				return res
					.status(404)
					.json({ message: 'Post not found' });
			res.json(post);
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
			const [updated] = await Post.update(
				{ title, content, image_url },
				{ where: { id } }
			);
			if (!updated)
				return res
					.status(404)
					.json({ message: 'Post not found' });
			const updatedPost = await Post.findByPk(id, {
				include: [
					{
						model: User,
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			res.json(updatedPost);
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
			if (!deleted)
				return res
					.status(404)
					.json({ message: 'Post not found' });
			res.status(204).send();
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},

	async getPostsByUser(req, res) {
		const { user_id } = req.params;
		try {
			const posts = await Post.findAll({
				where: { user_id },
				include: [
					{
						model: User,
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			res.json(posts);
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
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			res.json(posts);
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
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			res.json(posts);
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
						as: 'Author',
						attributes: [
							'id',
							'username',
							'full_name',
						],
					},
				],
			});
			res.json(posts);
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
			res.json({ totalPosts });
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},
};

module.exports = PostController;
