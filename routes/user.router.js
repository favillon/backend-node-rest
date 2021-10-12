const {Router} = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const {isRoleValid, emailExist, existUserForId} = require('../helpers/db-validators')

const {userGet, userPost, userPut, userDelete} = require('../controllers/user.controller')

const router = Router()

router.get('/', userGet)

router.post(
    '/',
    [
        check('name', 'Name es obligatorio').not().isEmpty(),
        check('password', 'Password es obligatorio').isLength({min:6}),
        check('email', 'Email no valido').isEmail(),
        check('email').custom(emailExist),
        check('role').custom(isRoleValid),
        //check('role', 'Rol no valido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        validateFields
    ],
    userPost
)

router.put(
    '/:id', 
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existUserForId),
        check('role').custom(isRoleValid),
        validateFields
    ],
    userPut
)
router.delete(
    '/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existUserForId),
        validateFields
    ],
    userDelete
)

module.exports = router