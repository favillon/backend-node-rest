const {response, request} = require('express')
const bcryptjs  = require('bcryptjs')

const User = require('../models/user.model')


const userGet = async(req = request, res = response)  => {

    const {limit = 5, from = 0} = req.query
    const query = {state:true}

    /*
    Consumo mas tiempo 
    const users = await User.find(query)
                            .skip(Number(from))
                            .limit(Number(limit))

    const total = await User.countDocuments(query)
    */
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
}


const  userPost = async (req, res = response)  => {

    const { name, email, password, role, originGoogle = false} = req.body    
    const user = new User({name, email, password, role, originGoogle})

    // Encriptar
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    // Save BD
    await user.save()

    res.json(
        {
            msg : 'post User Controller', 
            user
        }
    )
} 
const  userPut = async (req, res = response)  => {
    const {id} = req.params
    const {_id, password, originGoogle, ...userData} = req.body
    console.log(userData);
    const salt = bcryptjs.genSaltSync()
    userData.password = bcryptjs.hashSync(password, salt)

    const user = await User.findByIdAndUpdate(id, userData)

    res.json(
        {
            msg : 'put User Controller',
            user
        }
    )
}
const userDelete  = async(req, res = response)  => {
    const {id} = req.params
    const uid = req.uid    
    try {
        const user = await User.findByIdAndUpdate(id, {state:false})
        console.log("find user");
        console.log(user);
        return res.json(
            {
                msg : 'delete User Controller',
                user,
                uid
            }
        )    
    } catch (error) {
        console.log('error try catch userDelete') 
        //console.log(error) 
        return res.status(401).json({
            msg : 'No fue posible eliminar '
        }) 
    }
}

module.exports = {
    userGet, 
    userPost,
    userPut,
    userDelete
}