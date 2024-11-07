const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para cadastrar um novo usuário
router.post('/cadastro', userController.createUser);

// Rota para listar todos os usuários
router.get('/user', userController.getAllUsers);

// Rota para buscar um usuário por ID
router.get('/user/:id', userController.getUserById);

module.exports = router;
