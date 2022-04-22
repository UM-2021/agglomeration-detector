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
  const alerts = await Alert.find({ room_id: res.locals.room._id });
  res.status(200).json({
    status: 'success',
    results: alerts.length,
    data: alerts,
  });
});

exports.getAlert = catchAsync(async (req, res, next) => {
  const alert = await Alert.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: alert,
  });
});
