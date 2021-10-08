const {response, request} = require('express')

const userGet = (req = request, res = response)  => {
    const {q, api, name=null} = req.query
    res.json(
        {
            msg : 'get User Controller',
            q,
            api,
            name
        }
    )
}


const  userPost = (req, res = response)  => {
    const body = req.body
    res.json(
        {
            msg : 'post User Controller', 
            body
        }
    )
} 
const  userPut = (req, res = response)  => {
    const id = req.params.id
    res.json(
        {
            msg : 'put User Controller',
            id
        }
    )
}
const userDelete  = (req, res = response)  => {
    res.json(
        {
            msg : 'delete User Controller'
        }
    )
}

module.exports = {
    userGet, 
    userPost,
    userPut,
    userDelete
}