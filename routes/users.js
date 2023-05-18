const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');


router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.post('/update/:id', passport.checkAuthentication,usersController.update);

router.get('/SignUp',usersController.signUp);

router.get('/SignIn',usersController.signIn);

router.post('/create',usersController.create);

// use passport as middleware to authenticate
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect:'/users/SignIn'},
    ),usersController.create_session);

router.get('/SignOut',usersController.destroySession);
module.exports = router;