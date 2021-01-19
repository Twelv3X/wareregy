const express = require('express');
const queries = require("../operators/queries");
const utilizador = require("../models/utilizador")
const reg = require("../models/registo")
const api = express.Router();
const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({
    extended: true
  }));

api.post('/registos', async function(request, response) {
    console.log("Request on /registos : ", request.body);
    var user_id = request.body.user_id;
    var registo_data = request.body.registo_data;
    let query = new queries();
    registos = await query.devolverRegistos(user_id,registo_data);
    if (registos.length > 0){
        
        response.json(registos);
        response.end();
    }
})

api.post('/applogin', async function(request, response) {
    console.log("Pedido no /applogin : ", request.body);
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
            nRegistos = await query.getNrRegistos(results[0].user_id);
            console.log();
            let user = new utilizador(results[0].user_id, results[0].user_nome, results[0].user_email, results[0].user_login, results[0].user_privilegio,results[0].user_xp,results[0].nivel,results[0].min_xp,results[0].max_xp, nRegistos[0].nRegistos);
            response.json(user);
            console.log("Login efetuado: ", user);
            response.end();
        } else {
            response.json({isAuth : false, message : 'Login Falhou'});
            console.log("Login Rejeitado");
            response.end();
            
        }           
    };
});

api.post('/enviarregisto', async function(request, response) {
    console.log("Request on /enviarregisto");
   
    let userId = request.body.user_id;
    let prodId = request.body.produto_id;
    let regData = request.body.registo_data;
    let regHora = request.body.registo_hora;
    let exp = request.body.exp;
    let registo = new reg("",userId,prodId,regData,regHora);

    let query = new queries();
    try{
    exp = await query.atualizarExp(exp, userId);
    registos = await query.enviarRegisto(registo);

    if(registos && exp){
        uExp = await query.getUserExp(userId);
        if(uExp.length > 0){
            response.set('Content-Type', 'text/html');
            response.send(uExp);
            
            response.end();
        }
       
    }else{
        response.set('Content-Type', 'text/html');
        response.send(["Erro"]);
        response.end();
    }
    }catch(err){
        
    }
})

module.exports = api;