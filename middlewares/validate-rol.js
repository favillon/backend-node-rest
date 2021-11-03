const { response, request } = require('express')

const isAdmin = async(req = request, res = response, next) => {
    console.log('isAdmin');
    console.log(req.user);
    if (!req.user && req.user.role !== "ADMIN_ROLE") {
        console.log('sin rol');
        return res.status(401).json({
            msg : 'Usuario sin privilegios'
        })
    }
    next()
}


// operador rest
const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg : `No posees nimgun de estos : ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    isAdmin,
    hasRole
}