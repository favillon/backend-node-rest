const {response, request} = require('express');
const productModel = require('../models/product.model');

const getProduct = async(req = request, res = response)  => {
    const {limit = 5, from = 0} = req.query
    const query = {state:true}

    try {
        const [total, products] = await Promise.all([
            productModel.countDocuments(query),
            productModel.find(query)
            .populate('user','name')
                .skip(Number(from))
                .limit(Number(limit))
        ])
        res.json({
            msg : 'getCategory',
            total,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'getProduct catch '
        })
    }
}


const getProductById = async (req = request, res = response) => {    
    
    const {id} = req.params      
    try {
        const product = await productModel
            .findById(id)
            .populate('user','name')
            .populate('category','name')
       
        res.json({
            ok : true,
            msg : 'getCategoryById',
            product
        })

               
    } catch (error) {
        res.json({
            ok : false,
            msg : 'getProductById catch',
           
        })
    }    
}

const postProduct = async (req = request, res = response) => {    
    
    const {status, user, ...body} = req.body

    try {        
        const name = body.name
        const productFind = await productModel.findOne({name})

        if  (productFind) {
            return res.status(400).json({
                msg : `Ya existe el producto ${name}`,
            })
        }

        const data = {
            ...body,            
            name : body.name.toUpperCase(),
            user : req.user._id
        }
        
        const prodcut = new productModel(data)
        await prodcut.save()
        
        res.status(201).json({
            ok : true,
            msg : `Nuevo Producto ${name}`,
            prodcut
        })

               
    } catch (error) {
        console.log(error);
        res.json({
            ok : false,
            msg : 'postProdcut catch',
           
        })
    }    
}

const putProduct = async (req = request, res = response) => {    
    const {id} = req.params
    const {status, user, ...data} = req.body
    try {
        if (data.name) {
            data.name = data.name.toUpperCase()
        }
        data.user = req.user._id    
        const product = await productModel
            .findByIdAndUpdate(id, data,{new:true})
            
        res.json({
            ok : true,
            msg : 'putProduct',
            product
        })

               
    } catch (error) {
        console.log(error);
        res.json({
            ok : false,
            msg : 'putProduct catch',
        })
    }    
}

const deleteProduct = async (req = request, res = response) => {    
    const {id} = req.params
    try {
        const data =  { state :false}
        const product = await productModel
        .findByIdAndUpdate(id, data,{new:true})
        res.json({
            ok : true,
            msg : 'deleteProduct',
            product
        })

               
    } catch (error) {
        res.json({
            ok : false,
            msg : 'deleteProduct catch',
           
        })
    }    
}

module.exports = {
    getProduct,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}