const cron = require('node-cron');
const { transporter } = require('../config/mail');

cron.schedule('05 16 * * *', async () => {
  try {
    console.log('Cron job started at:', new Date());

    const mailOptions = {
      to: 'duongvantiendtu@gmail.com',
      subject: 'Nhắc nhở lịch hẹn',
      text: 'Chào Tien, đây là nhắc nhở về lịch hẹn của bạn với Bác sĩ vào lúc 15:55 giờ Việt Nam.',
    };
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Lỗi khi gửi nhắc nhở qua email:', error);
  }
});
