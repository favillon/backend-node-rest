const {Router} = require('express')
const { check } = require('express-validator')
const { getCategory, getCategoryById, postCategory, putCategory, deleteCategory} = require('../controllers/category.controller')

const { validateFields, validateJWT, isAdmin} = require('../middlewares/')

const {existCategoryForId} = require('../helpers/db-validators')

const router = Router()

router.get(
    '/',
    getCategory
)

router.get(
    '/:id',
    [
        check('id', 'No es un id valido de mongo').isMongoId(),
        check('id').custom(existCategoryForId),
        validateFields
    ],
    getCategoryById
)

router.post(
    '/', 
    [
        validateJWT,
        check('name', 'Name es obligatorio').not().isEmpty(),
        validateFields
    ],
    postCategory
)

router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'Name es obligatorio').not().isEmpty(),
        check('id', 'No es un id valido de mongo').isMongoId(),
        check('id').custom(existCategoryForId),
        validateFields
    ],   
    putCategory
)

router.delete(
    '/:id',
    [
        validateJWT,
        isAdmin,
        check('id', 'No es un id valido de mongo').isMongoId(),
        check('id').custom(existCategoryForId),
        validateFields
    ],      
    deleteCategory
)



module.exports = router