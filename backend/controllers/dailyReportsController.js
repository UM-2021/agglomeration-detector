const DailyReport = require('../models/dailyReportsModel');
const catchAsync = require('../utils/catchAsync');

exports.addDailyReport = catchAsync(async (req, res, next) => {
  const dailyReports = new DailyReport(req.body);
  await dailyReports.save(function (err, dailyReports) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: dailyReports,
    });
  });
});

exports.getDailyReports = catchAsync(async (req, res, next) => {
  const dailyReports = await DailyReport.find({ room: req.body.room });
  res.status(200).json({
    status: 'success',
    results: dailyReports.length,
    data: dailyReports,
  });
});

exports.getDailyReport = catchAsync(async (req, res, next) => {
  const dailyReports = await DailyReport.find({
    _id: req.params.id,
    room: req.body.room,
  });
  res.status(200).json({
    status: 'success',
    data: dailyReports,
  });
});

exports.updateDailyReport = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedDailyReport = req.body;
  const options = { new: true };

  const result = await DailyReport.findByIdAndUpdate(
    id,
    updatedDailyReport,
    options
  );
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteDailyReport = catchAsync(async (req, res, next) => {
  const dailyReports = await DailyReport.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: dailyReports,
  });
});
