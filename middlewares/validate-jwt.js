const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user.model')

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg : 'No existe token en la peticion'
        })
    }
    //console.log(token);

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_KEY_JWT)
        
        const usuario = await UserModel.findById(uid)
        if (!usuario && !usuario.state ) {
            console.warn(usuario)
            return res.status(401).json({
                msg : 'Token no valido - Usuario no autorizado'
            })
        }
        
        req.user = usuario

        next()
    } catch (error) {
        return res.status(401).json({
            msg : 'Token no valido'
        })
    }    
}

module.exports = {
    validateJWT
}