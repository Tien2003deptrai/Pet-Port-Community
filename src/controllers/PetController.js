const { Pet, User, Category } = require('../models');

const PetController = {
  // Tạo pet mới
  async create(req, res) {
    const {
      owner_id,
      category_id,
      name,
      breed,
      age,
      gender,
      description,
      medical_history,
    } = req.body;
    try {
      const pet = await Pet.create({
        owner_id,
        category_id,
        name,
        breed,
        age,
        gender,
        description,
        medical_history,
      });
      res.status(201).json(pet);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy tất cả pet, kèm thông tin chủ sở hữu và danh mục
  async getAll(req, res) {
    try {
      const pets = await Pet.findAll({
        include: [
          {
            model: User,
            as: 'PetOwner', // Sửa thành alias đúng theo cấu hình trong index.js
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category', // Đúng với index.js
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(pets);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy pet theo id, kèm thông tin chủ sở hữu và danh mục
  async getById(req, res) {
    const { id } = req.params;
    try {
      const pet = await Pet.findByPk(id, {
        include: [
          {
            model: User,
            as: 'PetOwner', // Sửa thành alias đúng theo cấu hình trong index.js
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category', // Đúng với index.js
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      if (!pet) return res.status(404).json({ message: 'Pet not found' });
      res.json(pet);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Cập nhật pet
  async update(req, res) {
    const { id } = req.params;
    const {
      owner_id,
      category_id,
      name,
      breed,
      age,
      gender,
      description,
      medical_history,
    } = req.body;
    try {
      const [updated] = await Pet.update(
        {
          owner_id,
          category_id,
          name,
          breed,
          age,
          gender,
          description,
          medical_history,
        },
        { where: { id } },
      );
      if (!updated) return res.status(404).json({ message: 'Pet not found' });
      const updatedPet = await Pet.findByPk(id, {
        include: [
          {
            model: User,
            as: 'PetOwner', // Sửa thành alias đúng theo cấu hình trong index.js
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category', // Đúng với index.js
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Xóa pet
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Pet.destroy({
        where: { id },
      });
      if (!deleted) return res.status(404).json({ message: 'Pet not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy pet theo id chủ sở hữu
  async getPetsByOwner(req, res) {
    const { owner_id } = req.params;
    try {
      const pets = await Pet.findAll({
        where: { owner_id },
        include: [
          {
            model: User,
            as: 'PetOwner', // Sửa thành alias đúng theo cấu hình trong index.js
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category', // Đúng với index.js
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(pets);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy pet theo id danh mục
  async getPetsByCategory(req, res) {
    const { category_id } = req.params;
    try {
      const pets = await Pet.findAll({
        where: { category_id },
        include: [
          {
            model: User,
            as: 'PetOwner', // Sửa thành alias đúng theo cấu hình trong index.js
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category', // Đúng với index.js
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(pets);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy pet theo giới tính
  async getPetsByGender(req, res) {
    const { gender } = req.params;
    try {
      const pets = await Pet.findAll({
        where: { gender },
        include: [
          {
            model: User,
            as: 'PetOwner', // Sửa thành alias đúng theo cấu hình trong index.js
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category', // Đúng với index.js
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(pets);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Đếm tổng số pet
  async countPets(req, res) {
    try {
      const totalPets = await Pet.count();
      res.json({ totalPets });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = PetController;
