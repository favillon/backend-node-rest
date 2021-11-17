const Role = require('../models/rol.model')
const User = require('../models/user.model')
const Category = require('../models/category.model')
const Product = require('../models/product.model')

const isRoleValid = async(role = '') => {
    const existRole  = await Role.findOne({rol:role})            
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado`)
    }
}

const emailExist = async(email = '') => {
    const existEmail= await  User.findOne({email})
    if (existEmail) {
        throw new Error(`El email ${email} ya esta registrado`)
    }
}
const existUserForId = async(id = '') => {
    const existUser= await  User.findById(id)
    if (!existUser) {
        throw new Error(`El id ${id} no existe`)
    }
}

const existCategoryForId = async(id = '') => {    
    const existCategory = await  Category.findById(id)
    if (!existCategory) {
        throw new Error(`El id ${id} no existe para la category`)
    }
}

const existProductForID = async(id = '') => {    
    const existProduct = await  Product.findById(id)
    if (!existProduct) {
        throw new Error(`El id ${id} no existe para productos`)
    }
}

module.exports = {
    isRoleValid,
    emailExist,
    existUserForId,
    existCategoryForId,
    existProductForID
}