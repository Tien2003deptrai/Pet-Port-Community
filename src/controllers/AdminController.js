const { User, Op } = require('@models');
const { generateRefreshTokenAndSetCookie } = require('../utils');
const { sendVerificationEmail } = require('../mail/emails');
const bcrypt = require('bcrypt');

const AdminController = {
  async registerUser(req, res) {
    try {
      const { username, password, email, role } = req.body;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'Username or email already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        role,
        verification_token: verificationToken,
        verification_token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      // await UserController.sendSMS(phone, `Your verification code is: ${verificationToken}`);

      // Ensure that you're setting the refresh token after user creation
      generateRefreshTokenAndSetCookie(res, newUser.id);

      await sendVerificationEmail(newUser.email, verificationToken);
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
      const { userId, role } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.role = role;
      await user.save();
      res.json({
        message: 'User role updated successfully',
      });
    } catch (error) {
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
};

module.exports = AdminController;
