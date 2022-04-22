const WeeklyReport = require('../models/weeklyReportsModel');
const catchAsync = require('../utils/catchAsync');

exports.addWeeklyReport = catchAsync(async (req, res, next) => {
  const weeklyReports = new WeeklyReport(req.body);
  await weeklyReports.save(function (err, weeklyReports) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: weeklyReports,
    });
  });
});

exports.getWeeklyReports = catchAsync(async (req, res, next) => {
  const weeklyReports = await WeeklyReport.find({ room_id: req.body.room_id });
  res.status(200).json({
    status: 'success',
    results: weeklyReports.length,
    data: weeklyReports,
  });
});

exports.getWeeklyReport = catchAsync(async (req, res, next) => {
  const weeklyReports = await WeeklyReport.find({
    _id: req.params.id,
    room_id: req.body.room_id,
  });
  res.status(200).json({
    status: 'success',
    data: weeklyReports,
  });
});

exports.updateWeeklyReport = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedWeeklyReport = req.body;
  const options = { new: true };

  const result = await WeeklyReport.findByIdAndUpdate(
    id,
    updatedWeeklyReport,
    options
  );
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteWeeklyReport = catchAsync(async (req, res, next) => {
  const weeklyReports = await WeeklyReport.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: weeklyReports,
  });
});
