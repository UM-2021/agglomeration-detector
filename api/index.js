const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const app = require('./app');

const { PORT, DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } = config;

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: '.env' });

const db = DATABASE;
const dbUrl = db
  .replace('<username>', DATABASE_USERNAME)
  .replace('<password>', DATABASE_PASSWORD);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(dbUrl, connectionParams)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('Error: ', err));

const port = PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // Unhandled promise rejections
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.error('SIGTERM received, shutting down the server...');
  server.close(() => {
    console.log('Process terminated!');
  });
});
