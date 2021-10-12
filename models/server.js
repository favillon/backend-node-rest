const cors = require('cors')
const express = require('express')

const {dbConnection} = require('../database/config.bd')
class Server {

    constructor(){
        this.app  = express()
        this.port = process.env.PORT_SERVER
        this.path = '/api/'
        this.userPath = this.path + 'user'

        //BD
        this.connectDB()

        // Middlewares
        this.middlewares()


        // Rutas
        this.routes()
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // parse body
        this.app.use(express.json())

        // public
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user.router'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server Node Run port ${this.port}`);
        })
    }
}

 module.exports = Server