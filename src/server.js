require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

//Conecta ao banco de dados e inicia o servidor
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao banco de dados MySQL');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MySQL:', error.message);
    }

})();

//Inicia o servidor na porta definida no .env

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});