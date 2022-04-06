const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.post('/', roomController.addRoom);
router.get('/', roomController.getRooms);
router.patch('/:id', roomController.updateRoom);
router.get('/:id', roomController.getRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
