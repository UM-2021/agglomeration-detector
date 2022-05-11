const express = require('express');
const router = express.Router({ mergeParams: true });

const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/', roomController.addRoom);
router.get('/', roomController.getRooms);
router.patch('/:id', roomController.updateRoom);
router.get('/:id', roomController.getRoom);
router.delete('/:id', roomController.deleteRoom);
router.get('/monthlyOccuppancy', roomController.getRoomsMonthlyOccupancy);

module.exports = router;
