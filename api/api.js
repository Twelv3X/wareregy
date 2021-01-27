const express = require('express');
const queries = require("../operators/queries");
const utilizador = require("../models/utilizador")
const reg = require("../models/registo")
const incid = require("../models/incidencia")
const api = express.Router();
const bodyParser = require('body-parser');

var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');
var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='upload'/>" +
"<input type='submit' /></form>" +
"</body></html>";


api.use(bodyParser.urlencoded({
    extended: true
  }));

api.post('/registos', async function(request, response) {
    console.log("Request on /registos : ", request.body);
    var user_id = request.body.user_id;
    var registo_data = request.body.registo_data;
    let query = new queries();
    try{
    registos = await query.devolverRegistos(user_id,registo_data);
    if (registos.length > 0){
        
      response.json(registos);
      response.end();
  }
    }catch{

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

api.post('/mudarpassword', async function(request, response) {
    console.log("Request on /mudarpassword");
   
    let user_id = request.body.user_id;
    let user_password = request.body.user_password;
    let query = new queries();
    try{
    mudarPassword = await query.mudarPassword(user_id, user_password);
    
    if(mudarPassword.affectedRows > 0){
            response.set('Content-Type', 'text/html');
            response.send(["Sucesso"]);
            response.end();     
    }else{
        response.set('Content-Type', 'text/html');
        response.send(["Erro"]);
        response.end();
    }
    }catch(err){
        
    }
})



// --- //
api.get('/enviarincidencia', function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(form);
  
  });
  
  // Include the node file module
  var fs = require('fs');
  
  storage = multer.diskStorage({
      destination: './incidencias/',
      filename: function(req, file, cb) {
        return crypto.pseudoRandomBytes(16, function(err, raw) {
          if (err) {
            return cb(err);
          }
          return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
        });
      }
    });
  
  
  // Post files
  api.post(
    "/upload",
    multer({
      storage: storage
    }).single('upload'), function(req, res) {

      res.redirect("./incidencias/" + req.file.filename);
      let registo = JSON.parse(req.body.upload[1]);
      let incidencia = new incid();
      incidencia.user_id = registo.user_id;
      incidencia.produto_id = registo.produto_id;
      incidencia.incid_data = registo.registo_data;
      incidencia.incid_hora = registo.registo_hora;
      incidencia.caminhoFoto = "/incidencias/" + req.file.filename;
      incidencia.incid_comentario = req.body.upload[2];
      let query = new queries;
      query.enviarIncidencia(incidencia);
      console.log(incidencia);
      return res.status(200).end();
    });
  
  api.get('/incidencias/:upload', function (req, res){
    file = req.params.upload;
    var img = fs.readFileSync("./incidencias/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  
  });
  

module.exports = api;