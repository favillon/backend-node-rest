const {Router} = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
//const {isRoleValid, emailExist, existUserForId} = require('../helpers/db-validators')

const {login} = require('../controllers/auth.controller')

const router = Router()

//router.get('/', userGet)

router.post(
    '/login',
    [
        check('email', 'Correo Obligatorio').isEmail(),
        check('password', 'Clave Obligatoria').not().isEmpty(),
        validateFields
    ],
    login
)


module.exports = router