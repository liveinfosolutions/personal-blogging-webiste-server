'use strict'

const { AuthModel } = require('../../models/auth/auth.models');
const bcrypt = require('bcrypt');
const { GOT_ERROR, DATA_NOT_FOUND_ERROR, DATA_SAVED_SUCCESSFULLY } = require('../../shared/shared.handlers');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Todo -> Signup Api Controller
exports.SignupController = (req, res) => {
    const data = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return GOT_ERROR(res, errors.errors[0].msg, 'Sign up', false);
    }

    bcrypt.hash(data.password, 10).then(hashedPassword => {
        let newAuthModel = new AuthModel();
        newAuthModel.email = data.email;
        newAuthModel.password = hashedPassword;

        newAuthModel.save((error, UserSaved) => {
            if (error) {
                // Handle Error
                return GOT_ERROR(res, error, 'Sign Up', false);
            }

            if (!UserSaved) {
                // Data Not Found Handler
                return DATA_NOT_FOUND_ERROR(res, 'Sign Up', false);
            }

            // Successfully Signed Up Handler
            return DATA_SAVED_SUCCESSFULLY(res, 'Signed Up', 'Successfully signed up.');
        });
    })
}

// Todo -> Login Api Controller
exports.LoginController = (req, res) => {
    AuthModel.findOne({ email: req.body.email.toLowercase() }).then((UserData) => {
        if (!UserData) {
            // Email not found handler
            return DATA_NOT_FOUND_ERROR(res, 'Logging In', 'You have entered an invalid email address or password.')
        }

        bcrypt.compare(req.body.password, UserData.password).then(Result => {
            if (Result) {
                // create Token
                const token = jwt.sign({
                    email: req.body.email,
                    user_id: UserData._id
                },
                    'My Highly Protected string',
                    {
                        expiresIn: '10h'
                    }
                );

                const data = {
                    email: UserData.email
                }

                return res.status(200).send({
                    data,
                    token,
                    status: 'success',
                    message: 'Logged In Successfully.'
                })
            } else {
                // Password not case
                return DATA_NOT_FOUND_ERROR(res, 'Logging In', 'You have entered an invalid email address or password.');
            }
        });
    }).catch(error => {
        return GOT_ERROR(res, error, 'Logging In', false);
    })
}