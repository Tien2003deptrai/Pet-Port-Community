const sequelize = require('./database');
const upload = require('./multer');
const { transporter } = require('./mail');

module.exports = {
	sequelize,
	upload,
	transporter,
};
