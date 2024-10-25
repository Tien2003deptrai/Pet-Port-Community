const { Pet, User, Category } = require('@models');

const PetController = {
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
      images,
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
        images,
      });
      res.status(201).json({ success: true, data: pet });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const pets = await Pet.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'full_name', 'email', 'phone'],
            as: 'PetOwner',
          },
          {
            model: Category,
            attributes: ['id', 'name', 'type'],
            as: 'Category',
          },
        ],
      });
      res.status(201).json({ success: true, data: pets });
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
      const pet = await Pet.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'full_name', 'email', 'phone'],
            as: 'PetOwner',
          },
          {
            model: Category,
            attributes: ['id', 'name', 'type'],
            as: 'Category',
          },
        ],
      });
      if (!pet) return res.status(404).json({ message: 'Pet not found' });
      res.status(201).json({ success: true, data: pet });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

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
      images,
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
          images,
        },
        { where: { id } }
      );
      if (!updated) return res.status(404).json({ message: 'Pet not found' });
      const updatedPet = await Pet.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'full_name', 'email', 'phone'],
            as: 'PetOwner',
          },
          {
            model: Category,
            attributes: ['id', 'name', 'type'],
            as: 'Category',
          },
        ],
      });
      res.status(201).json({ success: true, data: updatedPet });
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
      const deleted = await Pet.destroy({
        where: { id },
      });
      if (!deleted) return res.status(404).json({ message: 'Pet not found' });
      res.status(201).json({ success: true, message: 'Detele successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPetsByOwner(req, res) {
    const { owner_id } = req.params;
    try {
      const pets = await Pet.findAll({
        where: { owner_id },
        include: [
          {
            model: User,
            attributes: ['id', 'full_name', 'email', 'phone'],
            as: 'PetOwner',
          },
          {
            model: Category,
            attributes: ['id', 'name', 'type'],
            as: 'Category',
          },
        ],
      });
      res.status(201).json({ success: true, data: pets });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPetsByCategory(req, res) {
    const { category_id } = req.params;
    try {
      const pets = await Pet.findAll({
        where: { category_id },
        include: [
          {
            model: User,
            attributes: ['id', 'full_name', 'email', 'phone'],
            as: 'PetOwner',
          },
          {
            model: Category,
            attributes: ['id', 'name', 'type'],
            as: 'Category',
          },
        ],
      });
      res.status(201).json({ success: true, data: pets });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPetsByGender(req, res) {
    const { gender } = req.params;
    try {
      const pets = await Pet.findAll({
        where: { gender },
        include: [
          {
            model: User,
            attributes: ['id', 'full_name', 'email', 'phone'],
            as: 'PetOwner',
          },
          {
            model: Category,
            attributes: ['id', 'name', 'type'],
            as: 'Category',
          },
        ],
      });
      res.status(201).json({ success: true, data: pets });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async countPets(req, res) {
    try {
      const totalPets = await Pet.count();
      res.status(201).json({ success: true, data: totalPets });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = PetController;
