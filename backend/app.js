const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const usersRouter = require('./routes/userRouter');
const roomsRouter = require('./routes/roomRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const Room = require('./models/roomModel');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.options('*', cors());

app.use(helmet());

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

// Redirect to React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(globalErrorHandler);

module.exports = app;
