const Alert = require('../models/alertModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const nodemailer = require('nodemailer');
const config = require('./../config');

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = config;

exports.addAlert = catchAsync(async (req, res, next) => {
  const alert = new Alert(req.body);
  await alert.save(function (err, alert) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: alert,
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: 'juan.staricco@decemberlabs.com',
      subject: 'Agglomeration Detector',
      text: 'This is a new Alert on your Room!',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
});

exports.getAlerts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Alert.find({ account: res.locals.user._id }),
    req.query
  )
    .filter()
    .limit()
    .paginate();
  const docs = await features.query;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: docs,
  });
});

exports.getAlertsByRoom = catchAsync(async (req, res, next) => {
  const alerts = await Alert.find({ room: req.params.id });
  res.status(200).json({
    status: 'success',
    results: alerts.length,
    data: alerts,
  });
});

exports.getAlert = catchAsync(async (req, res, next) => {
  const alert = await Alert.find({
    _id: req.params.id,
    room: req.body.room,
  });
  res.status(200).json({
    status: 'success',
    data: alert,
  });
});

exports.updateAlert = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedAlert = req.body;
  const options = { new: true };

  const result = await Alert.findByIdAndUpdate(id, updatedAlert, options);
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteAlert = catchAsync(async (req, res, next) => {
  const alert = await Alert.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: alert,
  });
});

exports.handleAlert = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const options = { new: true };

  const result = await Alert.findByIdAndUpdate(id, { handled: true }, options);
  res.status(200).json({
    status: 'success',
    data: result,
  });
});
