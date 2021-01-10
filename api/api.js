const express = require('express');
const queries = require("../operators/queries");
const api = express.Router();

api.post('/registos', async function(request, response) {
    console.log(request);
    var user_id = request.query.user_id;
    var registo_data = request.query.registo_data;
    console.log(user_id);
    console.log(registo_data);
    let query = new queries();
    registos = await query.devolverRegistos(user_id,registo_data);
    if (registos.length > 0){
        
        response.json(registos);
        response.end();
    }
})

module.exports = api;