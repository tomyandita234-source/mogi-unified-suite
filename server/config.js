module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mogiapp',
  JWT_SECRET: process.env.JWT_SECRET || 'mogiapp-secret-key',
  JWT_EXPIRE: '1d',
  UPLOAD_PATH: '../uploads'
};