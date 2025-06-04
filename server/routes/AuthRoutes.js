const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const ClienteController = require('../controllers/ClienteController');
const VeiculoController = require('../controllers/VeiculoController');
const CategoriaController = require('../controllers/CategoriaController');
const ItemController = require('../controllers/ItemController');
const upload = require('../config/uploud');

// Itens
router.post('/itens', ItemController.cadastrarItem);
router.get('/itens/por-estabelecimento/:id_estabelecimento', ItemController.listarItensPorEstabelecimento);

// Categorias
router.post('/categorias', upload.single('imagem'), CategoriaController.cadastrarCategoria);
router.get('/categorias/por-estabelecimento/:id_estabelecimento', CategoriaController.listarCategoriasPorEstabelecimento);

// Veículos
router.post('/veiculos', VeiculoController.cadastrarVeiculo);
router.get('/veiculos/por-estabelecimento/:id_estabelecimento', VeiculoController.listarVeiculosPorEstabelecimento);
router.get('/veiculos/por-cliente/:id_cliente', VeiculoController.listarVeiculosPorCliente);

// Clientes
router.post('/clientes', ClienteController.cadastrarCliente);
router.get('/clientes/por-estabelecimento/:id_estabelecimento', ClienteController.listarClientesPorEstabelecimento);

// Autenticação
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
