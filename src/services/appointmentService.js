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

  // Lista todos os agendamentos com dados do usuário e serviço
  static async listAppointments() {
    const [rows] = await pool.query(`
      SELECT 
        a.appointment_id,
        u.full_name AS client_name,
        u.email,
        s.name AS service_name,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.created_at
      FROM appointments a
      INNER JOIN users u ON u.user_id = a.user_id
      INNER JOIN services s ON s.service_id = a.service_id
      ORDER BY a.appointment_date, a.appointment_time
    `);

    return rows;
  }

  // Lista os agendamentos de um usuário específico
  static async listAppointmentsByUser(userId) {
    const [rows] = await pool.query(`
      SELECT 
        a.appointment_id,
        s.name AS service_name,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.created_at
      FROM appointments a
      INNER JOIN services s ON s.service_id = a.service_id
      WHERE a.user_id = ?
      ORDER BY a.appointment_date, a.appointment_time
    `, [userId]);

    return rows;
  }

  static async listAppointmentsByUser(userId) {
    const [rows] = await pool.query(`
    SELECT 
      a.appointment_id,
      s.name AS service_name,
      a.appointment_date,
      a.appointment_time,
      a.status
    FROM appointments a
    INNER JOIN services s ON s.service_id = a.service_id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date, a.appointment_time
  `, [userId]);

    return rows;
  }
}

module.exports = AppointmentService;

