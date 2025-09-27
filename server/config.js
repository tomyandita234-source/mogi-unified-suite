module.exports = {
  PORT: process.env.PORT || 5000,
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'mogiapp-secret-key',
  JWT_EXPIRE: '1d',
  UPLOAD_PATH: '../uploads',
  // Database configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_NAME: process.env.DB_NAME || 'mogiapp'
};