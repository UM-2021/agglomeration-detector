const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.post('/', roomController.addRoom);
router.get('/', roomController.getRooms);

module.exports = router;
