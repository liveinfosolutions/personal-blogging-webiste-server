'use strict'

const express = require('express');
const api = express.Router();
const AuthController = require('../../controllers/auth/auth.controllers');
const { check } = require('express-validator');
const { SHARED_MESSAGES } = require('../../shared/shared.message');
const { replaceByLabel } = require('../../global/global.methods');


api.post('/signup',
    check('email', replaceByLabel(SHARED_MESSAGES.provideValidDataError, 'Email Address')).isEmail(),
    check('email', replaceByLabel(SHARED_MESSAGES.provideValidDataError, 'Email Address')).not().isEmpty(),
    check('password', replaceByLabel(SHARED_MESSAGES.provideValidDataError, 'Password')).not().isEmpty(),
    AuthController.SignupController
);

api.post('/login',
    check('email', replaceByLabel(SHARED_MESSAGES.provideValidDataError, 'Email Address')).isEmail(),
    check('email', replaceByLabel(SHARED_MESSAGES.provideValidDataError, 'Email Address')).not().isEmpty(),
    check('password', replaceByLabel(SHARED_MESSAGES.provideValidDataError, 'Password')).not().isEmpty(),
    AuthController.LoginController
);

module.exports = api;