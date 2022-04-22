const express = require('express');
const router = express.Router({ mergeParams: true });

const weeklyReportsController = require('../controllers/weeklyReportsController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/', weeklyReportsController.addWeeklyReport);
router.get('/', weeklyReportsController.getWeeklyReports);
router.patch('/:id', weeklyReportsController.updateWeeklyReport);
router.get('/:id', weeklyReportsController.getWeeklyReport);
router.delete('/:id', weeklyReportsController.deleteWeeklyReport);

module.exports = router;
