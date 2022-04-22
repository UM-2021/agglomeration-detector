const LiveReport = require('../models/liveReportsModel');
const catchAsync = require('../utils/catchAsync');

exports.addLiveReport = catchAsync(async (req, res, next) => {
  const liveReports = new LiveReport(req.body);
  await liveReports.save(function (err, liveReports) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: liveReports,
    });
  });
});

exports.getLiveReports = catchAsync(async (req, res, next) => {
  const liveReports = await LiveReport.find({ room_id: req.body.room_id });
  res.status(200).json({
    status: 'success',
    results: liveReports.length,
    data: liveReports,
  });
});

exports.getLiveReport = catchAsync(async (req, res, next) => {
  const liveReports = await LiveReport.find({
    _id: req.params.id,
    room_id: req.body.room_id,
  });
  res.status(200).json({
    status: 'success',
    data: liveReports,
  });
});

exports.updateLiveReport = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedLiveReport = req.body;
  const options = { new: true };

  const result = await LiveReport.findByIdAndUpdate(
    id,
    updatedLiveReport,
    options
  );
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteLiveReport = catchAsync(async (req, res, next) => {
  const liveReports = await LiveReport.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: liveReports,
  });
});
