const pool = require('../config/db');

class UserService {

  // Função para criar um novo usuário
  static async createUser({ full_name, email, password_hash, phone, role }) {
    await pool.query(
      'CALL create_user(?,?,?,?,?)',
      [full_name, email, password_hash, phone, role]
    );
  }

  // Função para buscar um usuário pelo email
  static async getUserByEmail(email) {
    const [rows] = await pool.query(
      'CALL get_user_by_email(?)',
      [email]
    );

    return rows[0][0];
  }
}

module.exports = UserService;