const express = require('express');
const AppointmentController = require('../controllers/appointmentController');

const router = express.Router();

// Rota para criar um novo agendamento
router.post('/', AppointmentController.create);

// Rota para cancelar um agendamento
router.put('/:id/cancel', AppointmentController.cancel);

module.exports = router;