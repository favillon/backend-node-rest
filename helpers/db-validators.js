const Role = require('../models/rol.model')
const User = require('../models/user.model')

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
module.exports = {
    isRoleValid,
    emailExist,
    existUserForId
}