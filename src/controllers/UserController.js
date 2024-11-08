const { User } = require('@models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateRefreshTokenAndSetCookie, generateToken } = require('../utils/generateToken');
const {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetSuccessEmail,
} = require('../mail/emails');
// const client = require('../config/twilio');
const { Op } = require('sequelize');

const UserController = {
  async register(req, res) {
    try {
      const { username, password, email } = req.body;

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

  // sendSMS: async (phone, message) => {
  // 	try {
  // 		const messageResponse =
  // 			await client.messages.create({
  // 				body: message,
  // 				from: process.env.TWILIO_PHONE_NUMBER,
  // 				to: phone,
  // 			});
  // 		console.log(
  // 			`SMS sent! Message SID: ${messageResponse.sid}`
  // 		);
  // 	} catch (error) {
  // 		console.error(
  // 			'Error sending SMS:',
  // 			error.message
  // 		);
  // 		console.error('Full error details:', error);
  // 	}
  // },

  async verifyEmail(req, res) {
    const { code } = req.body;

    try {
      const user = await User.findOne({
        where: {
          verification_token: code,
          verification_token_expires_at: {
            [Op.gt]: new Date(),
          },
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired verification code',
        });
      }

      user.is_verified = true;
      user.verification_token = null;
      user.verification_token_expires_at = null;
      await user.save();

      await sendWelcomeEmail(user.email, user.username);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
      });
    } catch (error) {
      console.error('Error in verifyEmail: ', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = generateToken(user.id, user.role);
      const refreshToken = generateRefreshTokenAndSetCookie(res, user.id);

      user.lastLogin = new Date();
      await user.save();
      res.status(200).json({
        message: 'Logged in successfully',
        token,
        refreshToken,
        user: user,
      });
    } catch (error) {
      console.error('Error logging in: ', error);
      res.status(500).json({
        error: 'Error logging in',
      });
    }
  },

  async logout(req, res) {
    res.clearCookie('refreshToken');
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  },

  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, {
        expiresIn: '30s',
      });
      res.json({ token: newToken });
    } catch (error) {
      console.error('Error refreshing token: ', error);
      res.status(403).json({
        error: 'Invalid refresh token',
      });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

      user.reset_password_token = resetToken;
      user.reset_password_expires_at = resetTokenExpiresAt;

      await user.save();

      await sendPasswordResetEmail(
        user.email,
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      );

      res.json({
        success: true,
        message: 'Password reset link sent to your email',
      });
    } catch (error) {
      console.error('Error in forgotPassword: ', error);
      res.status(500).json({
        error: 'Error in forgotPassword',
      });
    }
  },

  async resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          reset_password_token: token, // Correct snake_case naming
          reset_password_expires_at: {
            [Op.gt]: new Date(), // Check if token is still valid
          },
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpiresAt = null;
      await user.save();

      await sendResetSuccessEmail(user.email);

      res.status(200).json({
        success: true,
        message: 'Password reset successful',
      });
    } catch (error) {
      console.error('Error resetting password: ', error);
      res.status(500).json({
        success: false,
        message: 'Error resetting password',
      });
    }
  },

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { username, email } = req.body;
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.update({ username, email }); // Await the update operation
      res.json({ user });
    } catch (error) {
      console.error('Error updating user: ', error);
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy(); // Await the destroy operation
      res.json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user: ', error);
      res.status(500).json({
        error: 'Error deleting user',
      });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user: user });
    } catch (error) {
      console.error('Error getting user by id: ', error);
      res.status(500).json({
        error: 'Error getting user by id',
      });
    }
  },

  async getDoctors(req, res) {
    try {
      const doctors = await User.findAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });

      const doctorUsers = doctors.filter(user => user.role.includes('Doctor'));

      if (doctorUsers.length === 0) {
        return res.status(404).json({ error: 'No doctors found' });
      }

      res.json({ doctors: doctorUsers });
    } catch (error) {
      console.error('Error getting doctors: ', error);
      res.status(500).json({
        error: 'Error getting doctors',
      });
    }
  },
};

module.exports = UserController;
