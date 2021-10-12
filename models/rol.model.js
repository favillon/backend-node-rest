const {Schema, model} = require('mongoose')

const RoleSchema = Schema({
    rol : {
        type : String,
        require : [true, 'role obligatorio']
    }
})

module.exports = model('Role', RoleSchema)