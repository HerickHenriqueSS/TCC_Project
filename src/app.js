const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

//Permite requisições de diferentes origens
app.use(cors());

//Analisa o corpo das requisições em JSON
app.use(express.json());

//Rotas de usuário
app.use('/api/users', userRoutes);

//Rotas de agendamentos
app.use('/api/appointments', appointmentRoutes);

//Rotas de autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

module.exports = app;