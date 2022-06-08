const LiveReport = require('../models/liveReportsModel');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');
const config = require('./../config');
const User = require('../models/userModel');
const Room = require('../models/roomModel');
const Alert = require('../models/alertModel');
const Co2Report = require('../models/co2ReportModel');
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = config;
const luxon = require('luxon');
const { DateTime } = luxon;

exports.statsFirst = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.addCo2Report = catchAsync(async (req, res, next) => {
  const { co2 } = req.body;
  const room = req.params.id;
  const co2Report = new Co2Report({ co2, room });
  await co2Report.save(async function (err, co2Report) {
    if (err) {
      return next(err);
    }
    const roomEntity = await Room.findById(room);

    if (co2 < 400 || co2 > 1500) {
      const alertType = 'air';
      const alertValue = 'Bad air quality detected';

      const alert = new Alert({
        room,
        type: alertType,
        value: alertValue,
        account: roomEntity.account,
      });
      await alert.save(async function (err) {
        if (err) {
          return next(err);
        }
      });

      const userId = roomEntity.account;
      const user = await User.findById(userId);

      const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        host: 'smtp.office365.com',
        port: '587',
        auth: {
          user: EMAIL_ADDRESS,
          pass: EMAIL_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: EMAIL_ADDRESS,
        to: user.email,
        subject: 'Agglomeration Detector',
        text: `This is a new ${alertValue} on your Room ${roomEntity.name}!`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
    res.status(201).json({
      status: 'success',
      data: co2Report,
    });
  });
});

exports.getRoomCo2ReportLive = catchAsync(async (req, res, next) => {
  const co2Report = await Co2Report.findOne(
    {
      room: req.params.id,
    },
    {},
    { sort: { createdAt: -1 } }
  );
  res.status(200).json({
    status: 'success',
    data: {
      co2: co2Report ? co2Report.co2 : null,
      time: co2Report ? co2Report.time : null,
      createdAt: co2Report ? co2Report.createdAt : null,
    },
  });
});

exports.getRoomsCo2ReportLive = catchAsync(async (req, res, next) => {
  let rooms = await Room.find({ account: res.locals.user._id });

  rooms = rooms.map(async (room) => {
    const co2Report = await Co2Report.findOne(
      {
        room: room._id,
      },
      {},
      { sort: { createdAt: -1 } }
    );
    return {
      room: room._id,
      name: room.name,
      co2: co2Report ? co2Report.co2 : null,
      time: co2Report ? co2Report.time : null,
      createdAt: co2Report ? co2Report.createdAt : null,
    };
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: rooms,
  });
});

exports.getRoomOccupancyReportsMonthly = catchAsync(async (req, res, next) => {
  //[(fecha, occupancy), (fecha, occupancy), ...]

  let monthData = new Date();
  monthData = monthData.setMonth(monthData.getMonth() - 1);

  let liveReports = await LiveReport.find(
    {
      room: req.params.id,
      date: { $gte: monthData },
    },
    {},
    { sort: { date: 1 } }
  );

  const roomMonthlyReport = [];
  let roomMonthlyReportActualDate = liveReports[0].date;
  let roomMonthlyReportActualAverage = liveReports[0].averageOccupancy;
  let roomMonthlyReportActualQuantity = 1;
  let diff;

  liveReports.map((rep, index) => {
    if (index !== 0) {
      diff = DateTime.fromJSDate(rep.date).diff(
        DateTime.fromJSDate(roomMonthlyReportActualDate),
        ['hours']
      );
      if (Math.floor(diff.toObject().hours) < 6) {
        roomMonthlyReportActualQuantity++;
        roomMonthlyReportActualAverage =
          (roomMonthlyReportActualAverage + rep.averageOccupancy) /
          roomMonthlyReportActualQuantity;
      } else {
        roomMonthlyReport.push([
          roomMonthlyReportActualDate,
          roomMonthlyReportActualAverage,
        ]);
        roomMonthlyReportActualQuantity = 1;
        roomMonthlyReportActualAverage = rep.averageOccupancy;
        roomMonthlyReportActualDate = rep.date;
      }
    }
    if (index === liveReports.length - 1)
      roomMonthlyReport.push([
        roomMonthlyReportActualDate,
        roomMonthlyReportActualAverage,
      ]);
  });

  res.status(200).json({
    status: 'success',
    data: roomMonthlyReport,
  });
});

exports.getRoomCo2ReportsMonthly = catchAsync(async (req, res, next) => {
  //[(fecha, co2), (fecha, co2), ...]

  let monthData = new Date();
  monthData = monthData.setMonth(monthData.getMonth() - 1);

  let co2Reports = await Co2Report.find(
    {
      room: req.params.id,
      date: { $gte: monthData },
    },
    {},
    { sort: { date: 1 } }
  );

  const roomMonthlyReport = [];
  let roomMonthlyReportActualDate = co2Reports[0].date;
  let roomMonthlyReportActualCo2 = co2Reports[0].co2;
  let roomMonthlyReportActualQuantity = 1;
  let diff;

  co2Reports.map((rep, index) => {
    if (index !== 0) {
      diff = DateTime.fromJSDate(rep.date).diff(
        DateTime.fromJSDate(roomMonthlyReportActualDate),
        ['hours']
      );
      if (Math.floor(diff.toObject().hours) < 6) {
        roomMonthlyReportActualQuantity++;
        roomMonthlyReportActualCo2 =
          (roomMonthlyReportActualCo2 + rep.co2) /
          roomMonthlyReportActualQuantity;
      } else {
        roomMonthlyReport.push([
          roomMonthlyReportActualDate,
          roomMonthlyReportActualCo2,
        ]);
        roomMonthlyReportActualQuantity = 1;
        roomMonthlyReportActualCo2 = rep.co2;
        roomMonthlyReportActualDate = rep.date;
      }
    }
    if (index === co2Reports.length - 1)
      roomMonthlyReport.push([
        roomMonthlyReportActualDate,
        roomMonthlyReportActualCo2,
      ]);
  });

  res.status(200).json({
    status: 'success',
    data: {
      roomMonthlyReport,
    },
  });
});

exports.getRoomsCo2ReportsMonthly = catchAsync(async (req, res, next) => {
  //{"roomname1":[(fecha, occupancy), (fecha, occupancy), ...],"roomname2":[(fecha, occupancy), (fecha, occupancy), ...]}
  let monthData = new Date();
  monthData = monthData.setMonth(monthData.getMonth() - 1);

  const roomsMonthlyReport = [];
  let rooms = await Room.find({ account: res.locals.user._id });

  rooms = rooms.map(async (room) => {
    const co2Reports = await Co2Report.find({ room: room._id });

    const roomMonthlyReport = [];
    if (co2Reports && co2Reports.length > 0) {
      let roomMonthlyReportActualDate = co2Reports[0].date;
      let roomMonthlyReportActualCo2 = co2Reports[0].co2;
      let roomMonthlyReportActualQuantity = 1;
      let diff;

      co2Reports.map((rep, index) => {
        if (index !== 0) {
          diff = DateTime.fromJSDate(rep.date).diff(
            DateTime.fromJSDate(roomMonthlyReportActualDate),
            ['hours']
          );
          if (Math.floor(diff.toObject().hours) < 6) {
            roomMonthlyReportActualQuantity++;
            roomMonthlyReportActualCo2 = Math.round(
              (roomMonthlyReportActualCo2 + rep.co2) /
                roomMonthlyReportActualQuantity
            );
          } else {
            roomMonthlyReport.push([
              roomMonthlyReportActualDate,
              roomMonthlyReportActualCo2,
            ]);
            roomMonthlyReportActualQuantity = 1;
            roomMonthlyReportActualCo2 = rep.co2;
            roomMonthlyReportActualDate = rep.date;
          }
        }
        if (index === co2Reports.length - 1)
          roomMonthlyReport.push([
            roomMonthlyReportActualDate,
            roomMonthlyReportActualCo2,
          ]);
      });

      const name = room.name;

      roomsMonthlyReport.push({ name, data: roomMonthlyReport });
    }
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: roomsMonthlyReport,
  });
});

exports.getRoomsOccupancyReportsMonthly = catchAsync(async (req, res, next) => {
  //{"roomname1":[(fecha, occupancy), (fecha, occupancy), ...],"roomname2":[(fecha, occupancy), (fecha, occupancy), ...]}
  let monthData = new Date();
  monthData = monthData.setMonth(monthData.getMonth() - 1);

  const roomsMonthlyReport = [];
  let rooms = await Room.find({ account: res.locals.user._id });

  rooms = rooms.map(async (room) => {
    const liveReports = await LiveReport.find({ room: room._id });

    const roomMonthlyReport = [];
    if (liveReports && liveReports.length > 0) {
      let roomMonthlyReportActualDate = liveReports[0].date;
      let roomMonthlyReportActualAverage = liveReports[0].averageOccupancy;
      let roomMonthlyReportActualQuantity = 1;
      let diff;

      liveReports.map((rep, index) => {
        if (index !== 0) {
          diff = DateTime.fromJSDate(rep.date).diff(
            DateTime.fromJSDate(roomMonthlyReportActualDate),
            ['hours']
          );
          if (Math.floor(diff.toObject().hours) < 6) {
            roomMonthlyReportActualQuantity++;
            roomMonthlyReportActualAverage = Math.round(
              (roomMonthlyReportActualAverage + rep.averageOccupancy) /
                roomMonthlyReportActualQuantity
            );
          } else {
            roomMonthlyReport.push([
              roomMonthlyReportActualDate,
              roomMonthlyReportActualAverage,
            ]);
            roomMonthlyReportActualQuantity = 1;
            roomMonthlyReportActualAverage = rep.averageOccupancy;
            roomMonthlyReportActualDate = rep.date;
          }
        }
        if (index === liveReports.length - 1)
          roomMonthlyReport.push([
            roomMonthlyReportActualDate,
            roomMonthlyReportActualAverage,
          ]);
      });

      const name = room.name;

      roomsMonthlyReport.push({ name, data: roomMonthlyReport });
    }
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: roomsMonthlyReport,
  });
});
