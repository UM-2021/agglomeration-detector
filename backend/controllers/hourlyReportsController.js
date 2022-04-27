const HourlyReport = require('../models/hourlyReportsModel');
const catchAsync = require('../utils/catchAsync');

exports.addHourlyReport = catchAsync(async (req, res, next) => {
  const hourlyReports = new HourlyReport(req.body);
  await hourlyReports.save(function (err, hourlyReports) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: hourlyReports,
    });
  });
});

exports.getHourlyReports = catchAsync(async (req, res, next) => {
  const hourlyReports = await HourlyReport.find({ room: req.body.room });
  res.status(200).json({
    status: 'success',
    results: hourlyReports.length,
    data: hourlyReports,
  });
});

exports.getHourlyReport = catchAsync(async (req, res, next) => {
  const hourlyReports = await HourlyReport.find({
    _id: req.params.id,
    room: req.body.room,
  });
  res.status(200).json({
    status: 'success',
    data: hourlyReports,
  });
});

exports.updateHourlyReport = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedHourlyReport = req.body;
  const options = { new: true };

  const result = await HourlyReport.findByIdAndUpdate(
    id,
    updatedHourlyReport,
    options
  );
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteHourlyReport = catchAsync(async (req, res, next) => {
  const hourlyReports = await HourlyReport.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: hourlyReports,
  });
});
