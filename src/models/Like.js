const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define(
  'Like',
  {
    petOwner_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    comment_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'Likes',
  },
);

module.exports = Like;
