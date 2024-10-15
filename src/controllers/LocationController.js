const { Location, User } = require('@models');

const LocationController = {
  async create(req, res) {
    const { name, type } = req.body;
    try {
      const location = await Location.create({
        name,
        type,
      });
      res.status(200).json({ success: true, data: location });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const locations = await Location.findAll({
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['id', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: locations });
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
      const location = await Location.findByPk(id, {
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['id', 'full_name'],
          },
        ],
      });
      if (!location)
        return res.status(404).json({
          message: 'Location not found',
        });
      res.status(200).json({ success: true, data: location });
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
      const [updated] = await Location.update(
        { name, type },
        { where: { id } },
      );
      if (!updated)
        return res.status(404).json({
          message: 'Location not found',
        });
      const updatedLocation = await Location.findByPk(id, {
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['id', 'full_name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: updatedLocation });
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
      const userCount = await User.count({
        where: { location_id: id },
      });
      if (userCount > 0) {
        return res.status(400).json({
          message: 'Location is in use and cannot be deleted',
        });
      }

      const deleted = await Location.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({
          message: 'Location not found',
        });
      res.status(200).json({ success: true, message: 'Delete success' });
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
      const locations = await Location.findAll({
        where: { type },
      });
      res.status(200).json({ success: true, data: locations });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = LocationController;
