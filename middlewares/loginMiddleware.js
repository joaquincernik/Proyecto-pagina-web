const path = require('path');

/* BODY es igual que CHECK */
const { body } = require('express-validator');

const validations = [
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
]

module.exports = validations 