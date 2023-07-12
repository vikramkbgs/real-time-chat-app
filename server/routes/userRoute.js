const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/Register', userController.registerUser);

router.post('/Login',userController.login);

router.get('/find/:userId', userController.findUser);

router.get('/', userController.getUser);

module.exports = router;