const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const ClienteController = require('../controllers/ClienteController');
const VeiculoController = require('../controllers/VeiculoController');

router.post('/veiculos', VeiculoController.cadastrarVeiculo);
router.get('/veiculos/por-estabelecimento/:id_estabelecimento', VeiculoController.listarVeiculosPorEstabelecimento);

router.post('/clientes', ClienteController.cadastrarCliente);
router.get('/clientes/por-estabelecimento/:id_estabelecimento', ClienteController.listarClientesPorEstabelecimento);


// Rotas de auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
