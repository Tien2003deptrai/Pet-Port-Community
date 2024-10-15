const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define(
  'Post',
  {
    petOwner_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    tableName: 'Posts',
  }
);

module.exports = Post;
