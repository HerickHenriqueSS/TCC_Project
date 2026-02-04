const express = require('express');
const AppointmentController = require('../controllers/appointmentController');

const router = express.Router();

// Rota para criar um novo agendamento
router.post('/', AppointmentController.create);

// Listar todos os agendamentos
router.get('/', AppointmentController.list);

// Rota para cancelar um agendamento
router.put('/:id/cancel', AppointmentController.cancel);

// Lista agendamentos de um usuário específico
router.get('/user/:user_id', AppointmentController.listByUser);


const authMiddleware = require('../middlewares/authMiddleware');

// Cliente vê só seus proprios agendagemtos
router.get('/me', authMiddleware, AppointmentController.listMyAppointments);

module.exports = router;