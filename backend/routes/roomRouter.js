const express = require('express');
const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.protect, roomController.addRoom);
router.get('/', authController.protect, roomController.getRooms);
router.patch('/:id', authController.protect, roomController.updateRoom);
router.get('/:id', authController.protect, roomController.getRoom);
router.delete('/:id', authController.protect, roomController.deleteRoom);

module.exports = router;
