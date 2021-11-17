const {Router} = require('express')
const { check } = require('express-validator')
const { getProduct, getProductById, postProduct, putProduct, deleteProduct} = require('../controllers/product.controller')

const { validateFields, validateJWT, isAdmin} = require('../middlewares/')

const {existCategoryForId, existProductForID} = require('../helpers/db-validators')

const router = Router()

router.get(
    '/',
    getProduct
)

router.get(
    '/:id',
    [
        check('id', 'No es un id valido de mongo').isMongoId(),
        check('id').custom(existProductForID),
        validateFields
    ],
    getProductById
)

router.post(
    '/', 
    [
        validateJWT,
        check('name', 'Name es obligatorio').not().isEmpty(),
        check('category', 'No es un id valido de mongo').isMongoId(),
        check('category').custom(existCategoryForId),
        check('category', 'Category es obligatorio').not().isEmpty(),
        validateFields
    ],
    postProduct
)

router.put(
    '/:id',
    [
        validateJWT,        
        check('id').custom(existProductForID),
        validateFields
    ],   
    putProduct
)

router.delete(
    '/:id',
    [
        validateJWT,
        isAdmin,
        check('id', 'No es un id valido de mongo').isMongoId(),
        check('id').custom(existProductForID),
        validateFields
    ],      
    deleteProduct
)



module.exports = router