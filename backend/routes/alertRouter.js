const express = require('express');
const router = express.Router({ mergeParams: true });

const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.post('/', alertController.addAlert);
router.get('/', alertController.getAlerts);
router.get('/room/:id', alertController.getAlertsByRoom);
router.patch('/:id', alertController.updateAlert);
router.get('/:id', alertController.getAlert);
router.delete('/:id', alertController.deleteAlert);
router.patch('/handle/:id', alertController.handleAlert);

module.exports = router;
