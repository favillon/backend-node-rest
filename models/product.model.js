const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    name : {
        type : String,
        require : [true, 'producto obligatorio']
    },
    status : {
        type : Boolean,
        require : [true, 'status obligatorio'],
        default : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : [true, 'user obligatorio']
    },
    price : {
        type : Number,
        default : 0
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        require : [true, 'Category obligatorio']
    },
    description : {
        type : String
    },
    offered : {
        type : Boolean,
        default : true
    }
})

ProductSchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject()
    return data
}

module.exports = model('Product', ProductSchema)