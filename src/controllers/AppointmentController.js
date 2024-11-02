const { Appointment, Pet, User, Service, Category, Location, Op } = require('@models');

const AppointmentController = {
  // Tạo cuộc hẹn
  async create(req, res) {
    const { pet_owner_id, pet_id, doctor_id, service_id, appointment_date, notes } = req.body;
    try {
      const existingAppointments = await Appointment.findAll({
        where: {
          doctor_id,
          appointment_date: {
            [Op.between]: [
              new Date(appointment_date),
              new Date(new Date(appointment_date).getTime() + 60 * 60 * 1000), // Cửa hẹn kéo dài 1 giờ
            ],
          },
        },
      });
      if (existingAppointments.length > 0) {
        return res.status(409).json({
          message: 'Xung đột với các cuộc hẹn hiện có',
        });
      }

      const appointment = await Appointment.create({
        pet_owner_id,
        pet_id,
        doctor_id,
        service_id,
        appointment_date,
        notes,
      });
      res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Lấy tất cả cuộc hẹn với dữ liệu liên quan
  async getAll(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
        order: [['appointment_date', 'ASC']],
      });
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Lấy cuộc hẹn theo ID với dữ liệu liên quan
  async getById(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id, {
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
      });
      if (!appointment)
        return res.status(404).json({
          message: 'Không tìm thấy cuộc hẹn',
        });
      res.status(200).json({ success: true, data: appointment });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Cập nhật cuộc hẹn
  async update(req, res) {
    const { id } = req.params;
    const { appointment_date, notes, status } = req.body;
    try {
      const [updated] = await Appointment.update(
        { appointment_date, notes, status },
        { where: { id } }
      );
      if (!updated)
        return res.status(404).json({
          message: 'Không tìm thấy cuộc hẹn',
        });
      const updatedAppointment = await Appointment.findByPk(id, {
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
      });
      res.status(200).json({ success: true, data: updatedAppointment });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Xóa cuộc hẹn
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Appointment.destroy({
        where: { id },
      });
      if (!deleted)
        return res.status(404).json({
          message: 'Không tìm thấy cuộc hẹn',
        });
      res.status(200).json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Lấy cuộc hẹn theo chủ pet với dữ liệu liên quan
  async getByPetOwner(req, res) {
    const { pet_owner_id } = req.params;
    try {
      const appointments = await Appointment.findAll({
        where: { pet_owner_id },
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
        order: [['appointment_date', 'ASC']],
      });
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Lấy cuộc hẹn theo bác sĩ với dữ liệu liên quan
  async getByDoctor(req, res) {
    const { doctor_id } = req.params;
    try {
      const appointments = await Appointment.findAll({
        where: { doctor_id },
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
        order: [['appointment_date', 'ASC']],
      });
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Lấy cuộc hẹn theo trạng thái với dữ liệu liên quan
  async getByStatus(req, res) {
    const { status } = req.params;
    try {
      const appointments = await Appointment.findAll({
        where: { status },
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
        order: [['appointment_date', 'ASC']],
      });
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Lấy chi tiết cuộc hẹn với Pets và Doctors
  async getDetailsWithPetsAndDoctors(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          {
            model: Pet,
            as: 'Pet',
            include: [
              {
                model: User,
                as: 'PetOwner',
                attributes: ['id', 'username', 'full_name', 'email'],
              },
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'breed', 'age', 'gender'],
          },
          {
            model: User,
            as: 'Doctor',
            include: [
              {
                model: Location,
                as: 'Location',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'username', 'full_name', 'email'],
          },
          {
            model: Service,
            as: 'Service',
            include: [
              {
                model: Category,
                as: 'Category',
                attributes: ['id', 'name', 'type'],
              },
            ],
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
        order: [['appointment_date', 'ASC']],
      });
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },

  // Kiểm tra xung đột cuộc hẹn
  async checkAppointmentConflict(req, res) {
    const { doctor_id, appointment_date } = req.body;
    try {
      const appointmentStart = new Date(appointment_date);
      const appointmentEnd = new Date(appointmentStart.getTime() + 60 * 60 * 1000); // 1 giờ

      const existingAppointments = await Appointment.findAll({
        where: {
          doctor_id,
          appointment_date: {
            [Op.lt]: appointmentEnd,
            [Op.gte]: appointmentStart,
          },
        },
      });

      if (existingAppointments.length > 0) {
        return res.status(409).json({
          message: 'Xung đột với các cuộc hẹn hiện có',
        });
      }
      res.json({
        message: 'Không có xung đột, cuộc hẹn có thể được lên lịch',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error,
      });
    }
  },
};

module.exports = AppointmentController;
