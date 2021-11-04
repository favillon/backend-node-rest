const {response, request} = require('express')
const bcryptjs  = require('bcryptjs')

const User = require('../models/user.model')
const { generarJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

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


const googleSignIn = async (req = request, res = response) => {
    
    const {id_token} = req.body
    
    try {
        const {name, img, email} =  await googleVerify(id_token);
        console.log({name, img, email});
    
        let user = await User.findOne({email})
        console.log("user");
        console.log(user);
        // Crear usuario
        if (!user) {
            const data = {
                name,
                email,
                password : ':p',
                img, 
                originGoogle : true
            }
            user = new User(data)
            await user.save()
        } 

        // Status user
        if (!user.state) {
             return res.status(401).json({
                msg : 'hable con el administrador'
            })    
        }

        // generar token 
        const token = await generarJWT( user.id );
        res.json({
            user,
            token
        })

               
    } catch (error) {
        res.json({
            ok : false,
            msg : 'token no fue posible validarlo',
           
        })
    }    
}

module.exports = {
    login,
    googleSignIn
}