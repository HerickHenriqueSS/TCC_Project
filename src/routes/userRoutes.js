const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

//Rota para cadastro usuário
router.post('/register', UserController.register);

//Rota para login usuário
router.post('/login', UserController.login);

module.exports = router;