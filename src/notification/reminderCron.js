const cron = require('node-cron');
const { transporter } = require('../config/mail');

cron.schedule('45 20 * * *', async () => {
	try {
		const mailOptions = {
			to: 'duongvantiendtu@gmail.com',
			subject: 'Nhắc nhở lịch hẹn',
			text: `Chào Tien, đây là nhắc nhở về lịch hẹn của bạn với Bác sĩ vào lúc ....`,
		};
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(
			'Lỗi khi gửi nhắc nhở qua email:',
			error
		);
	}
});
