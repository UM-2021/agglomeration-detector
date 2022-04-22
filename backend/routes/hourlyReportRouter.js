const express = require('express');
const router = express.Router({ mergeParams: true });

const hourlyReportsController = require('../controllers/hourlyReportsController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/', hourlyReportsController.addHourlyReport);
router.get('/', hourlyReportsController.getHourlyReports);
router.patch('/:id', hourlyReportsController.updateHourlyReport);
router.get('/:id', hourlyReportsController.getHourlyReport);
router.delete('/:id', hourlyReportsController.deleteHourlyReport);

module.exports = router;
