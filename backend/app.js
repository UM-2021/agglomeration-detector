const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const usersRouter = require('./routes/userRouter');
const roomsRouter = require('./routes/roomRouter');
const alertsRouter = require('./routes/alertRouter');

const globalErrorHandler = require('./controllers/errorController');

var app = express();

app.enable('trust proxy');

app.use(logger('dev'));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.options('*', cors());

app.use(helmet());

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/alert', alertsRouter);

app.use(globalErrorHandler);

// Redirect to React App
app.get('*', (req, res) => {
  console.log('Redirecting to React');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
