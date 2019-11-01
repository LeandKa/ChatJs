const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const controller = require('../controllers/indexController');
const isAuth =require('../auth/isAuth');

router.get('/',isAuth,controller.chat);

router.get('/login',controller.getLogin);

router.post('/login',controller.postAcessarLogin);

router.get('/criarUsuario',controller.getNovoUsuarioLogin);

router.post('/criarUsuario',check('email').isEmail().withMessage('Por favor entrar com um Email valido'),controller.postNovoUsuarioLogin);

router.get('/deslogar',controller.postDeslogar);




module.exports = router;