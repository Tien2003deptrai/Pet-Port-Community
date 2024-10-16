const { Wishlist, Product, Service } = require('@models');

const WishlistController = {
  async create(req, res) {
    const { petOwner_id, product_id, service_id } = req.body;
    try {
      const wishlistItem = await Wishlist.create({
        petOwner_id,
        product_id,
        service_id,
      });
      res.status(201).json({ success: true, data: wishlistItem });
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
      res.status(201).json({ success: true, data: wishlists });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getWishlistByUser(req, res) {
    const { petOwner_id } = req.params;
    try {
      const wishlists = await Wishlist.findAll({
        where: { petOwner_id },
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
      res.status(201).json({ success: true, data: wishlists });
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
      res.status(201).json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async checkItemExists(req, res) {
    const { petOwner_id, product_id, service_id } = req.body;
    try {
      const item = await Wishlist.findOne({
        where: { petOwner_id, product_id, service_id },
      });
      if (item) {
        res.status(200).json({ success: true, exists: true });
      } else {
        res.status(200).json({ success: true, exists: false });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async deleteAll(req, res) {
    const { petOwner_id } = req.params;
    try {
      await Wishlist.destroy({ where: { petOwner_id } });
      res.status(201).json({ success: true, message: 'Delete all successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async countWishlistItems(req, res) {
    const { petOwner_id } = req.params;
    try {
      const totalItems = await Wishlist.count({
        where: { petOwner_id },
      });
      res.status(201).json({ success: true, data: totalItems });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = WishlistController;
