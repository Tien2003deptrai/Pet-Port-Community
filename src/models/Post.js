const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define(
	'Post',
	{
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
