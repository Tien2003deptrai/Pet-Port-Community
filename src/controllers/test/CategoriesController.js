const { Category, Product, sequelize } = require('../../models');

const CategoriesController = {
  async getCategoriesWithProductCount(req, res) {
    try {
      const categoriesWithProductCount = await Category.findAll({
        attributes: [
          'id',
          'name',
          [sequelize.fn('COUNT', sequelize.col('Products.id')), 'productCount'],
        ],
        include: [
          {
            model: Product,
            attributes: [],
          },
        ],
        group: ['Category.id'],
      });

      return res.status(200).json(categoriesWithProductCount);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = CategoriesController;
