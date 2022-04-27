const Alert = require('../models/alertModel');
const catchAsync = require('../utils/catchAsync');

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
  });
});

exports.getAlerts = catchAsync(async (req, res, next) => {
  const alerts = await Alert.find({ account: res.locals.user._id });
  res.status(200).json({
    status: 'success',
    results: alerts.length,
    data: alerts,
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
