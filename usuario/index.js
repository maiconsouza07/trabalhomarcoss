const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');

// Sincronizando o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.');
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

const app = express();
app.use(bodyParser.json());

// Rotas do serviço de usuários
app.use('/usuarios', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serviço de Usuários rodando na porta ${PORT}`);
});
