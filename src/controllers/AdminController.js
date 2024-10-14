const { User } = require('@models');

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
