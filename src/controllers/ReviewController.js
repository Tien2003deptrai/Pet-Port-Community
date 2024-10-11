const { Review, User, Product, Service, sequelize, Op } = require('@models');

const ReviewController = {
  async create(req, res) {
    const {
      reviewer_id,
      product_id,
      service_id,
      rating,
      title,
      comment,
      is_verified_purchase,
    } = req.body;
    try {
      const review = await Review.create({
        reviewer_id,
        product_id,
        service_id,
        rating,
        title,
        comment,
        is_verified_purchase,
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const reviews = await Review.findAll({
        include: [
          {
            model: User,
            as: 'PetOwner',
            attributes: ['id', 'username', 'full_name'],
          },
          {
            model: Product,
            as: 'Product',
            attributes: ['id', 'name'],
          },
          {
            model: Service,
            as: 'Service',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.json(reviews);
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
      const review = await Review.findByPk(id, {
        include: [
          {
            model: User,
            as: 'PetOwner',
            attributes: ['id', 'username', 'full_name'],
          },
          {
            model: Product,
            as: 'Product',
            attributes: ['id', 'name'],
          },
          {
            model: Service,
            as: 'Service',
            attributes: ['id', 'name'],
          },
        ],
      });
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.json(review);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { rating, title, comment } = req.body;
    try {
      const [updated] = await Review.update(
        { rating, title, comment },
        { where: { id } },
      );
      if (!updated)
        return res.status(404).json({ message: 'Review not found' });
      const updatedReview = await Review.findByPk(id);
      res.json(updatedReview);
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
      const deleted = await Review.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({ message: 'Review not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAverageRating(req, res) {
    try {
      const result = await Review.findAll({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
        ],
      });
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getReviewsByProduct(req, res) {
    const { product_id } = req.params;
    try {
      const reviews = await Review.findAll({
        where: { product_id },
        include: [
          {
            model: User,
            as: 'PetOwner',
            attributes: ['id', 'username', 'full_name'],
          },
        ],
      });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getReviewsByPetOwner(req, res) {
    const { reviewer_id } = req.params;
    try {
      const reviews = await Review.findAll({
        where: { reviewer_id },
        include: [
          {
            model: Product,
            as: 'Product',
            attributes: ['id', 'name'],
          },
          {
            model: Service,
            as: 'Service',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getReviewsByService(req, res) {
    const { service_id } = req.params;
    try {
      const reviews = await Review.findAll({
        where: { service_id },
        include: [
          {
            model: User,
            as: 'PetOwner',
            attributes: ['id', 'username', 'full_name'],
          },
          {
            model: Product,
            as: 'Product',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getBestAndWorstReview(req, res) {
    try {
      const bestReview = await Review.findOne({
        order: [['rating', 'DESC']],
      });
      const worstReview = await Review.findOne({
        order: [['rating', 'ASC']],
      });
      res.json({ bestReview, worstReview });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async verifyReview(req, res) {
    const { id } = req.params;
    try {
      const updated = await Review.update(
        { is_verified_purchase: true },
        { where: { id } },
      );
      if (!updated[0])
        return res.status(404).json({ message: 'Review not found' });
      res.json({
        message: 'Review verified successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async countReviews(req, res) {
    try {
      const totalReviews = await Review.count();
      res.json({ totalReviews });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = ReviewController;
