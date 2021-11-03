const {response, request} = require('express')
const bcryptjs  = require('bcryptjs')

const User = require('../models/user.model')
const { generarJWT } = require('../helpers/generate-jwt')

const login = async(req = request, res = response)  => {

    const {email, password} = req.body
    console.log(email);
    console.log(password);
    

    try {
        const user = await User.findOne({email})
            
        if (!user || user.status === false ) {
            return res.status(400).json({
                msg : 'Email/Pass no son correctos'
            })
        }

        const validPass =  bcryptjs.compareSync(password, user.password)
        // Generar token 
        if (!validPass) {
            return res.status(400).json({
                msg : 'Email/Pass no son correctos - PDW'
            })
        }

        const token = await generarJWT( user.id );
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Contactese con el administrador'
        })
    }
}

module.exports = {
    login
}