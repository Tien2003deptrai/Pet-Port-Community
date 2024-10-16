const app = require('./app');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 4000;

sequelize
  .sync()
  .then(() => {
    console.log('Database & tables created!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to create database tables:', error);
  });
