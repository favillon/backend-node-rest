const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
    return new Promise( (ressolve, reject)  => {
        const  payload = {uid}
        jwt.sign(payload, process.env.SECRET_KEY_JWT,{
            expiresIn: '2h'
        },(error, token)=>{
            if (error) {
                console.log(error)
                reject('No fue posible generar token ')
            } else {
                ressolve(token)
            }
        })
    })
}


module.exports = {
    generarJWT
}