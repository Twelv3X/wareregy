const express = require('express');
const queries = require("../operators/queries");
const utilizador = require("../models/utilizador")
const api = express.Router();
const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({
    extended: true
  }));

api.post('/registos', async function(request, response) {
    console.log(req);
    var user_id = request.body.user_id;
    var registo_data = request.body.registo_data;
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
    console.log(request);
    var useremail = request.body.user_email;
    var userpassword = request.body.user_password;
    if (useremail && userpassword) {
        let query = new queries();
        let results = 0;
        try{
        results = await query.verificarUtilizador(useremail,userpassword);
        }catch(err){
            
        }
        if (results.length > 0){
            let user = new utilizador(results[0].user_id, results[0].user_nome, results[0].user_email, results[0].user_privilegio,results[0].user_xp);
            response.json(user);
            response.end();
        } else {
            response.json({isAuth : false, message : 'Login Falhou'});
            console.log(response);
            response.end();
            
        }           
    };
});

module.exports = api;