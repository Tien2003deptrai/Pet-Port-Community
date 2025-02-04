const { Review, User, Product, sequelize } = require('@models');

const ReviewController = {
  async create(req, res) {
    const { petOwner_Id, product_id, service_id, rating, title, comment, is_verified_purchase } =
      req.body;
    try {
      const review = await Review.create({
        petOwner_Id,
        product_id,
        service_id,
        rating,
        title,
        comment,
        is_verified_purchase,
      });
      res.status(201).json({ success: true, data: review });
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
        ],
      });
      res.status(201).json({ success: true, data: reviews });
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
        ],
      });
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.status(201).json({ success: true, data: review });
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
      const [updated] = await Review.update({ rating, title, comment }, { where: { id } });
      if (!updated) return res.status(404).json({ message: 'Review not found' });
      const updatedReview = await Review.findByPk(id);
      res.status(201).json({ success: true, data: updatedReview });
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
      if (!deleted) return res.status(404).json({ message: 'Review not found' });
      res.status(201).json({ success: true, message: 'Delete successfully' });
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
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
      });
      res.status(201).json({ success: true, data: result[0] });
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
      res.status(201).json({ success: true, data: reviews });
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
        ],
      });
      res.status(201).json({ success: true, data: reviews });
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
      res.status(201).json({ success: true, bestReview, worstReview });
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
      const updated = await Review.update({ is_verified_purchase: true }, { where: { id } });
      if (!updated[0]) return res.status(404).json({ message: 'Review not found' });
      res.status(201).json({
        success: true,
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
      res.status(201).json({ success: true, totalReviews });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = ReviewController;
