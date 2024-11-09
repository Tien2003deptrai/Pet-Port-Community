const { Category, Product, Service, Pet } = require('@models');

const CategoryController = {
  async create(req, res) {
    const { name, type } = req.body;
    try {
      const category = await Category.create({
        name,
        type,
      });
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          { model: Product, as: 'CategoryProducts' },
          { model: Pet, as: 'CategoryPets' },
        ],
      });
      res.status(200).json({ success: true, data: categories });
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
      const category = await Category.findByPk(id, {
        include: [
          { model: Product, as: 'CategoryProducts' },
          { model: Pet, as: 'CategoryPets' },
        ],
      });
      if (!category)
        return res.status(404).json({
          message: 'Category not found',
        });
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
      const [updated] = await Category.update({ name, type }, { where: { id } });
      if (!updated)
        return res.status(404).json({
          message: 'Category not found',
        });
      const updatedCategory = await Category.findByPk(id);
      res.status(200).json({ success: true, data: updatedCategory });
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
      // Kiểm tra xem danh mục có đang được sử dụng không
      const productCount = await Product.count({
        where: { category_id: id },
      });
      const serviceCount = await Service.count({
        where: { category_id: id },
      });
      const petCount = await Pet.count({
        where: { category_id: id },
      });

      if (productCount > 0 || serviceCount > 0 || petCount > 0) {
        return res.status(400).json({
          message: 'Category is in use and cannot be deleted',
        });
      }

      const deleted = await Category.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({
          message: 'Category not found',
        });
      res.status(200).json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getByType(req, res) {
    const { type } = req.params;
    try {
      const categories = await Category.findAll({
        where: { type },
        include: [
          { model: Product, as: 'CategoryProducts' },
          { model: Pet, as: 'CategoryPets' },
        ],
      });
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = CategoryController;
