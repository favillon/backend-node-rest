const {Router} = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const {login, googleSignIn} = require('../controllers/auth.controller')

const router = Router()

router.post(
    '/login',
    [
        check('email', 'Correo Obligatorio').isEmail(),
        check('password', 'Clave Obligatoria').not().isEmpty(),
        validateFields
    ],
    login
)

router.post(
    '/google',
    [
        check('id_token', 'id token es Obligatorio').not().isEmpty(),
        validateFields
    ],
    googleSignIn
)


module.exports = router