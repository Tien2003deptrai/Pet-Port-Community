const { User, Op } = require('@models');
const { generateRefreshTokenAndSetCookie } = require('../utils');
const { sendVerificationEmail } = require('../mail/emails');
const bcrypt = require('bcrypt');

const AdminController = {
  async registerUser(req, res) {
    try {
      const { username, password, email, role } = req.body;

      // Kiểm tra nếu role là chuỗi thay vì mảng, chuyển nó thành mảng
      const roles = Array.isArray(role) ? role : [role];

      // Kiểm tra email đã tồn tại hay chưa
      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'Email already taken',
        });
      }

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo mã xác thực ngẫu nhiên
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      // Tạo người dùng mới với vai trò là JSON (mảng vai trò)
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        role: roles, // Lưu vai trò dưới dạng JSON (mảng)
        verification_token: verificationToken,
        verification_token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Hết hạn sau 24 giờ
      });

      // Tạo và thiết lập refresh token trong cookie
      generateRefreshTokenAndSetCookie(res, newUser.id);

      // Gửi email xác thực
      await sendVerificationEmail(newUser.email, verificationToken);

      // Phản hồi thành công
      res.status(201).json({ success: true, newUser });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({
        error: 'Error registering user',
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error deleting user',
      });
    }
  },

  async manageUserRoles(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const existingRoles = user.role || [];

      const newRoles = Array.isArray(role) ? role : [role];

      const updatedRoles = [...new Set([...existingRoles, ...newRoles])];

      user.role = updatedRoles;
      await user.save();

      res.json({
        message: 'User role updated successfully',
        user,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({
        error: 'Error updating user role',
      });
    }
  },

  async updateAvatar(req, res) {
    const { imageUrl } = req.body;
    const user_up = req.user.id;

    try {
      const user = await User.findByPk(user_up);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.imageUrl = imageUrl;
      await user.save();

      res.status(200).json({
        message: 'Avatar updated successfully',
        user,
      });
    } catch (error) {
      console.error('Error updating avatar: ', error);
      res.status(500).json({
        message: 'Error updating avatar',
      });
    }
  },

  async UpgradeToDoctor(req, res) {
    try {
      const {
        userId,
        cccd,
        clinic_address,
        practice_certificate,
        experience_years,
        opening_time,
        closing_time,
      } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updatedRoles = [...new Set([...user.role, 'Doctor'])];

      await user.update({
        cccd,
        clinic_address,
        practice_certificate,
        experience_years,
        opening_time,
        closing_time,
        role: updatedRoles,
      });

      res.status(200).json({ message: 'Upgrade to Doctor successful', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AdminController;
