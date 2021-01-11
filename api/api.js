const express = require('express');
const queries = require("../operators/queries");
const utilizador = require("../models/utilizador")
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

api.post('/applogin', async function(request, response) {
    console.log(request.query);
    var useremail = request.query.user_email;
    var userpassword = request.query.user_password;
    if (useremail && userpassword) {
        let query = new queries();
        let results = 0;
        try{
        results = await query.verificarUtilizador(useremail,userpassword);
        }catch(err){
            console.log(err);
        }
        //console.log(results);
        if (results.length > 0){
            let user = new utilizador(results[0].user_id, results[0].user_nome, results[0].user_email, results[0].user_privilegio);
            response.json(user);
            response.end();
        } else {
            response.message = 'Invalid username or password';
            response.end();
        }           
    };
});

module.exports = api;