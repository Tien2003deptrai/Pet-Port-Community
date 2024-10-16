const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define(
  'Like',
  {
    petOwner_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Likes',
  }
);

module.exports = Like;
