const { Wishlist, Product, Service } = require('../models');

const WishlistController = {
  async create(req, res) {
    const { user_id, product_id, service_id } = req.body;
    try {
      const wishlistItem = await Wishlist.create({
        user_id,
        product_id,
        service_id,
      });
      res.status(201).json(wishlistItem);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const wishlists = await Wishlist.findAll();
      res.json(wishlists);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getWishlistByUser(req, res) {
    const { user_id } = req.params;
    try {
      const wishlists = await Wishlist.findAll({
        where: { user_id },
        include: [
          {
            model: Product,
            as: 'WishlistProduct', 
            attributes: ['id', 'name', 'price'],
          },
          {
            model: Service,
            as: 'WishlistService', 
            attributes: ['id', 'name', 'price'],
          },
        ],
      });
      res.json(wishlists);
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
      const deleted = await Wishlist.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({
          message: 'Wishlist item not found',
        });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async checkItemExists(req, res) {
    const { user_id, product_id, service_id } = req.body;
    try {
      const item = await Wishlist.findOne({
        where: { user_id, product_id, service_id },
      });
      if (item) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async deleteAll(req, res) {
    const { user_id } = req.params;
    try {
      await Wishlist.destroy({ where: { user_id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async countWishlistItems(req, res) {
    const { user_id } = req.params;
    try {
      const totalItems = await Wishlist.count({
        where: { user_id },
      });
      res.json({ totalItems });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = WishlistController;
