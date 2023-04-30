const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');


router.get('/profile',usersController.profile);

router.get('/sign-Up',usersController.signUp);

router.get('/sign-In',usersController.signIn);

router.post('/create',usersController.create);

router.post('/create_session',usersController.create_session);


module.exports = router;