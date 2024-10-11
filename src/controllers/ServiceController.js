const { Service, User, Category } = require('@models');

const ServiceController = {
  // Tạo service mới
  async create(req, res) {
    const { doctor_id, category_id, name, description, price } = req.body;
    try {
      const service = await Service.create({
        doctor_id,
        category_id,
        name,
        description,
        price,
      });
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy tất cả dịch vụ, kèm thông tin bác sĩ và danh mục
  async getAll(req, res) {
    try {
      const services = await Service.findAll({
        include: [
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(services);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy dịch vụ theo id, kèm thông tin bác sĩ và danh mục
  async getById(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id, {
        include: [
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      if (!service)
        return res.status(404).json({ message: 'Service not found' });
      res.json(service);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Cập nhật dịch vụ
  async update(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
      const [updated] = await Service.update(
        { name, description, price },
        { where: { id } },
      );
      if (!updated)
        return res.status(404).json({ message: 'Service not found' });
      const updatedService = await Service.findByPk(id, {
        include: [
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(updatedService);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Xóa dịch vụ
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Service.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({ message: 'Service not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy tất cả dịch vụ theo bác sĩ
  async getServicesByDoctor(req, res) {
    const { doctor_id } = req.params;
    try {
      const services = await Service.findAll({
        where: { doctor_id },
        include: [
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(services);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy tất cả dịch vụ theo danh mục
  async getServicesByCategory(req, res) {
    const { category_id } = req.params;
    try {
      const services = await Service.findAll({
        where: { category_id },
        include: [
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(services);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Lấy tất cả dịch vụ đang hoạt động
  async getActiveServices(req, res) {
    try {
      const services = await Service.findAll({
        where: { is_active: true },
        include: [
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'full_name', 'email', 'phone'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'type'],
          },
        ],
      });
      res.json(services);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  // Đếm tổng số dịch vụ
  async countServices(req, res) {
    try {
      const totalServices = await Service.count();
      res.json({ totalServices });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = ServiceController;
