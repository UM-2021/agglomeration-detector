const express = require('express');
const router = express.Router({ mergeParams: true });

const roomController = require('../controllers/roomController');
const statsController = require('../controllers/statsController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/:id/stats/co2', statsController.addCo2Report);
router.get('/:id/stats/co2/live', statsController.getRoomCo2ReportLive);
// TODO
router.get('/:id/stats/co2/monthly', statsController.getRoomCo2ReportsMonthly);
router.get('/stats/co2/live', statsController.getRoomsCo2ReportLive);
// TODO
router.get('/stats/co2/monthly', statsController.statsFirst);

router.get('/:id/stats/occupancy/live', roomController.getRoomLiveOccupancy);
// TODO
router.get(
  '/:id/stats/occupancy/monthly',
  statsController.getRoomOccupancyReportsMonthly
);

router.get('/stats/occupancy/live', roomController.getRoomsLiveOccupancy);
//TODO
router.get('/stats/occupancy/monthly', statsController.statsFirst);

router.post('/', roomController.addRoom);
router.get('/', roomController.getRooms);
router.patch('/:id', roomController.updateRoom);
router.get('/:id', roomController.getRoom);
router.delete('/:id', roomController.deleteRoom);

// router.get('/liveOccupancy', roomController.getRoomsLiveOccupancy);
// router.get('/monthlyOccuppancy/', roomController.getRoomsMonthlyOccupancy);
// router.get('/:id/liveOccupancy/', roomController.getRoomLiveOccupancy);
// router.get('/:id/monthlyOccuppancy', roomController.getRoomLiveOccupancy);

module.exports = router;
