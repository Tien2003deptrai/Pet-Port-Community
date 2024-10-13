const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define(
  'Comment',
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    petOwner_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Comments',
  },
);

module.exports = Comment;
