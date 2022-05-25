const express = require('express');
const router = express.Router({ mergeParams: true });

const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.get('/liveOccupancy', roomController.getRoomsLiveOccupancy);
router.get('/dailyOccupancy', roomController.getRoomsDailyOccupancy);
router.get('/monthlyOccuppancy/', roomController.getRoomsMonthlyOccupancy);
router.get('/liveOccupancy/:id', roomController.getRoomLiveOccupancy);
router.get('/dailyOccupancy/:id', roomController.getRoomDailyOccupancy);
router.get('/monthlyOccuppancy/:id', roomController.getRoomMonthlyOccupancy);
router.post('/', roomController.addRoom);
router.get('/', roomController.getRooms);
router.patch('/:id', roomController.updateRoom);
router.get('/:id', roomController.getRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
