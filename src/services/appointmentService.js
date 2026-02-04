const pool = require('../config/db');

class AppointmentService {

  // Cria um novo agendamento usando a procedure do MySQL
  static async createAppointment({ user_id, service_id, date, time }) {
    await pool.query(
      'CALL create_appointment(?,?,?,?)',
      [user_id, service_id, date, time]
    );
  }

  // Cancela um agendamento existente
  static async cancelAppointment(appointmentId) {
    await pool.query(
      'CALL cancel_appointment(?)',
      [appointmentId]
    );
  }
}

module.exports = AppointmentService;