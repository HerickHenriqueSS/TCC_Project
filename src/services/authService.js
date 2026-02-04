const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;

class AuthService {
  static async login(email, password) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        name: user.name,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email
      }
    };
  }
}

module.exports = AuthService;