const { check, body } = require('express-validator');
const { loadUsers } = require('../data/dbModule');
const db = require('../database/models');


//REGISTER VALIDATIONS
module.exports = [

    check('userName')
    .notEmpty().withMessage('Éste campo es obligatorio').bail()
    .isLength({
        min : 3,
        max : 15
    }).withMessage('El nombre debe contener entre 3 y 15 caracteres').bail()
    .isAlpha('es-ES').withMessage('Sólo caracteres alfabéticos'),

    body('email')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isEmail().withMessage('Ingresá un email válido').bail()
        .custom((value, {req}) => {
/*             const user = loadUsers().find(user => user.email === value);
        
            if(user){
                return false
            }else {
                return true
            } */
            const user = db.User.findOne({
                where : {
                    email: user.email === value
                }
            })
                .then((user) => {
                    console.log(user);
                })
                .catch((error) => console.log(error))
                if(user){
                    return false
                } else {
                    return true
                }
        }).withMessage('El email ya se encuentra registrado'),

    check('password')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isLength({
            min : 8,
            max : 25
        }).withMessage('La contraseña debe contener entre 8 y 25 caracteres'),

    body('repass')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden')
];