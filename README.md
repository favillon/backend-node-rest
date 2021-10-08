## Node Aplicacion Basica Rest API

Desarrollo que cuenta con los elementos basico para configurar un rest api en node


Extension para valida en VSCODE `REST Client`  -- humao.rest-client

> https://marketplace.visualstudio.com/items?itemName=humao.rest-client



```http
GET http://localhost:3000/api/user?q=aaa&name=fabian&api=123456789

###

POST http://localhost:3000/api/user
content-type: application/json

{
    "name": "Usuario nombre",
    "time": "hoy"
}

###

PUT http://localhost:3000/api/user/10

###

DELETE http://localhost:3000/api/user
```
