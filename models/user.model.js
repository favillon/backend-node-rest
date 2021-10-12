const {Schema, model} = require('mongoose')

const userSchema = Schema({
    name : {
        type : String,
        require : [true, 'name obligatorio']
    },
    email : {
        type : String,
        require : [true, 'email obligatorio'],
        unique : true
    },
    password : {
        type : String,
        require : [true, 'contraseña obligatorio'],
        unique : true
    },
    img : {
        type : String
    },
    role : {
        type : String,
        require : [true, 'contraseña obligatorio'],
        emun : ['ADMIN_ROLE', 'USER_ROLE']
    },
    state : {
        type :  Boolean,
        default : true
    },
    originGoogle : {
        type :  Boolean,
        default : true
    }
})


userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()

    return user
}
module.exports = model('User', userSchema)