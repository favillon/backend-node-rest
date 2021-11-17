const {response, request} = require('express');
const categoryModel = require('../models/category.model');

const getCategory = async(req = request, res = response)  => {
    const {limit = 5, from = 0} = req.query
    const query = {state:true}

    try {
        const [total, categories] = await Promise.all([
            categoryModel.countDocuments(query),
            categoryModel.find(query)
            .populate('user','name')
                .skip(Number(from))
                .limit(Number(limit))
        ])
        res.json({
            msg : 'getCategory',
            total,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'getCategory catch '
        })
    }
}


const getCategoryById = async (req = request, res = response) => {    
    
    const {id} = req.params      
    try {
        const category = await categoryModel
            .findById(id)
            .populate('user','name')
       
        res.json({
            ok : true,
            msg : 'getCategoryById',
            category
        })

               
    } catch (error) {
        res.json({
            ok : false,
            msg : 'getCategoryById catch',
           
        })
    }    
}

const postCategory = async (req = request, res = response) => {    

    console.log(req.body);
    const name = req.body.name.toUpperCase()

    try {        

        const categoryFind = await categoryModel.findOne({name})

        if  (categoryFind) {
            return res.status(400).json({
                msg : `Ya existe la categoria ${name}`,
            })
        }

        const data = {
            name,
            user : req.user._id
        }
        
        const category = new categoryModel(data)
        await category.save()
        
        res.status(201).json({
            ok : true,
            msg : `Nueva categoria ${name}`,
        })

               
    } catch (error) {
        console.log(error);
        res.json({
            ok : false,
            msg : 'postCategory catch',
           
        })
    }    
}

const putCategory = async (req = request, res = response) => {    
    const {id} = req.params
    const {status, user, ...data} = req.body
    try {
        data.name = data.name.toUpperCase()
        data.user = req.user._id    
        const categoria = await categoryModel
            .findByIdAndUpdate(id, data,{new:true})
            
        res.json({
            ok : true,
            msg : 'putCategory',
            categoria
        })

               
    } catch (error) {
        console.log(error);
        res.json({
            ok : false,
            msg : 'putCategory catch',
        })
    }    
}

const deleteCategory = async (req = request, res = response) => {    
    const {id} = req.params
    try {
        const data =  { state :false}
        const categoria = await categoryModel
        .findByIdAndUpdate(id, data,{new:true})
        res.json({
            ok : true,
            msg : 'deleteCategory',
            categoria
        })

               
    } catch (error) {
        res.json({
            ok : false,
            msg : 'deleteCategory catch',
           
        })
    }    
}

module.exports = {
    getCategory,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory
}