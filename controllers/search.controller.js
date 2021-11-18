const {response, request} = require('express');
const {ObjectId} = require('mongoose').Types

const Category = require('../models/category.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')

const allowedCollections = [
    'category',
    'product',
    'user',
    'rol'
]

const searchCategory = async (term='', res=response) => {    
    const isMongoId  = ObjectId.isValid(term)
    if (isMongoId) {
        const category = await Category.findById(term)
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(term, 'i')
    const category = await Category.find({name:regex},{status : true})

    res.json({
        results: category
    })
}

const searchProduct = async (term='', res=response) => {    
    const isMongoId  = ObjectId.isValid(term)
    if (isMongoId) {
        const product = await Product.findById(term)
                                .populate('category','name')
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(term, 'i')
    const product = await Product.find({name:regex},{status : true})
                                .populate('category','name')

    res.json({
        results: product
    })
}

const searchUser = async (term='', res=response) => {    
    const isMongoId  = ObjectId.isValid(term)
    if (isMongoId) {
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i')
    const users = await User.find({
        $or : [{name:regex},{email:regex}],
        $and : [{status : true}]
    })

    res.json({
        results: users
    })
}

const search  = (req = request, res = response) => {
    const {collection, term} = req.params    
    if (!allowedCollections.includes(collection)) {
        res.status(400).json({
            msg : `La coleccion ${collection} no esta permitida`
        })
    }
    switch (collection) {
        case 'category':
                searchCategory(term, res)
            break;
        case 'product':
                searchProduct(term, res)
            break;
        case 'user':
                searchUser(term, res)
            break;
        default:
                res.status(500).json({
                    msg : 'Accion no controlada'
                })
            break;
    }   
}

module.exports = {
    search
}