const AppointmentService = require('../services/appointmentService');

class AppointmentController {

  // Função para criar um novo agendamento
  static async create(req, res) {
    try {
      const { user_id, service_id, date, time } = req.body;

      await AppointmentService.createAppointment({
        user_id,
        service_id,
        date,
        time
      });

      res.status(201).json({ message: 'Agendamento realizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Função para cancelar um agendamento
  static async cancel(req, res) {
    try {
      const appointmentId = req.params.id;

      await AppointmentService.cancelAppointment(appointmentId);

      res.json({ message: 'Agendamento cancelado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Lista todos os agendamentos
  static async list(req, res) {
    try {
      const appointments = await AppointmentService.listAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Lista os agendamentos de um usuário específico
  static async listByUser(req, res) {
    try {
      const userId = req.params.user_id;

      const appointments = await AppointmentService.listAppointmentsByUser(userId);

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = AppointmentController;