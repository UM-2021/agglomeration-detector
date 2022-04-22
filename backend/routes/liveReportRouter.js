const express = require('express');
const router = express.Router({ mergeParams: true });

const liveReportsController = require('../controllers/liveReportsController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/', liveReportsController.addLiveReport);
router.get('/', liveReportsController.getLiveReports);
router.patch('/:id', liveReportsController.updateLiveReport);
router.get('/:id', liveReportsController.getLiveReport);
router.delete('/:id', liveReportsController.deleteLiveReport);

module.exports = router;
