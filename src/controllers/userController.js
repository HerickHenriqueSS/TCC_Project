const UserService = require('../services/userService');
const bcrypt = require('bcryptjs');

class UserController {

  // Função para cadastro de usuário
  static async register(req, res) {
    try {

      // Criptografa a senha antes de salvar
      const { full_name, email, password, phone, role } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      // Chama o serviço para criar o usuário
      await UserService.createUser({
        full_name,
        email,
        password_hash: passwordHash,
        phone,
        role
      });

      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Função para login do usuário

  static async login(req, res) {
    try {

      // Busca o usuário pelo email
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }


      // Verifica se a senha confere
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      res.json({
        message: 'Login realizado com sucesso',
        user: {
          id: user.user_id,
          name: user.full_name,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;