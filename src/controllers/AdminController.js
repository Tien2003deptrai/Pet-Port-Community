const { User, Op } = require('@models');
const { generateRefreshTokenAndSetCookie } = require('../utils');
const { sendVerificationEmail } = require('../mail/emails');
const bcrypt = require('bcryptjs');

const AdminController = {
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
        phone,
        date_of_birth,
        avatar_url,
        cccd,
        clinic_address,
        practice_certificate,
        experience_years,
        opening_time,
        closing_time,
        cccd_front_image,
        cccd_back_image,
        certificate_image,
      } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({
        phone,
        date_of_birth,
        avatar_url,
        cccd,
        clinic_address,
        practice_certificate,
        experience_years,
        opening_time,
        closing_time,
        cccd_front_image,
        cccd_back_image,
        certificate_image,
        is_doctor_approved: false,
      });

      res.status(200).json({
        message: 'Doctor registration request submitted. Awaiting admin approval.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          phone,
          date_of_birth,
          avatar_url,
          is_active: user.is_active,
          is_verified: user.is_verified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        doctor: {
          cccd: user.cccd,
          clinic_address: user.clinic_address,
          practice_certificate: user.practice_certificate,
          experience_years: user.experience_years,
          opening_time: user.opening_time,
          closing_time: user.closing_time,
          cccd_front_image: user.cccd_front_image,
          cccd_back_image: user.cccd_back_image,
          certificate_image: user.certificate_image,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async ApproveDoctor(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.is_doctor_approved) {
        return res.status(400).json({ message: 'User is already approved as Doctor' });
      }

      const updatedRoles = [...new Set([...user.role, 'Doctor'])];
      await user.update({
        role: updatedRoles,
        is_doctor_approved: true,
      });

      res.status(200).json({
        message: 'User successfully approved as Doctor',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          is_doctor_approved: user.is_doctor_approved,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async UpgradeToSeller(req, res) {
    try {
      const {
        userId,
        phone,
        store_name,
        store_address,
        business_license,
        store_logo,
        store_description,
      } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({
        phone,
        store_name,
        store_address,
        business_license,
        store_logo,
        store_description,
        is_store_verified: false,
      });

      res.status(200).json({
        message: 'Seller registration request submitted. Awaiting admin approval.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          phone,
          is_active: user.is_active,
          is_verified: user.is_verified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        seller: {
          store_name: user.store_name,
          store_address: user.store_address,
          business_license: user.business_license,
          store_logo: user.store_logo,
          store_description: user.store_description,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async ApproveSeller(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.is_store_verified) {
        return res.status(400).json({ message: 'User is already approved as Seller' });
      }

      const updatedRoles = [...new Set([...user.role, 'Seller'])];
      await user.update({
        role: updatedRoles,
        is_store_verified: true,
      });

      res.status(200).json({
        message: 'User successfully approved as Seller',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          is_store_verified: user.is_store_verified,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AdminController;
