const { Usuario } = require('../models');
const encriptador = require('../services/EncriptadorDeSenhas');
const usuarioSchema = require('../schemas/user');  // Importa o schema para validação

// Cadastrar novo usuário
const createUser = async (req, res) => {
  const { nome, email, cpf, nascimento, senha } = req.body;

  // Validação do schema com Zod
  const validation = usuarioSchema.safeParse({ nome, email, senha });

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  try {
    const senhaCriptografada = await encriptador.encriptar(senha);
    const novoUsuario = await Usuario.create({ nome, email, cpf, nascimento, senha: senhaCriptografada });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Listar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Buscar usuário por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
