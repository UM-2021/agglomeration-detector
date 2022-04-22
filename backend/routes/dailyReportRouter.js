const express = require('express');
const router = express.Router({ mergeParams: true });

const dailyReportsController = require('../controllers/dailyReportsController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/', dailyReportsController.addDailyReport);
router.get('/', dailyReportsController.getDailyReports);
router.patch('/:id', dailyReportsController.updateDailyReport);
router.get('/:id', dailyReportsController.getDailyReport);
router.delete('/:id', dailyReportsController.deleteDailyReport);

module.exports = router;
