const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log('Conexion a BD existosa');
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con BD')
    }
}


module.exports = {
    dbConnection
}